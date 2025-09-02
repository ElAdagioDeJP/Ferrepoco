const express = require('express');
const router = express.Router();
const { readData, writeData, uuidv4, updateProductStock } = require('../utils/dataHandler');
const { authorize } = require('../src/middleware/auth');
const { USE_DB, query, initPool } = require('../src/db');

function mapDbOrderRow(r) {
    const statusMap = {
        'pendiente': 'pending',
        'enviado': 'shipped',
        'completado': 'completed',
        'cancelado': 'cancelled'
    };
    const raw = (r.estado_pedido || '').toString().toLowerCase();
    return {
        id: String(r.id_pedido),
        clientId: String(r.id_cliente),
        date: r.fecha_pedido,
        status: statusMap[raw] || r.estado_pedido || 'pending',
        total: Number(r.total_pedido)
    };
}

// --- Cliente: Crear un nuevo pedido (realizar compra) ---
router.post('/', authorize(['client']), async (req, res) => {
    try {
        const { clientId, products: cartProducts } = req.body; // [{ productId, quantity }]
        if (!clientId || !cartProducts || !Array.isArray(cartProducts) || cartProducts.length === 0) {
            return res.status(400).json({ message: 'Client ID and products are required for an order.' });
        }

        if (USE_DB) {
            const pool = await initPool();
            const conn = await pool.getConnection();
            try {
                await conn.beginTransaction();

                // Fetch products with price and stock
                const ids = cartProducts.map(i => Number(i.productId)).filter(Boolean);
                if (!ids.length) {
                    await conn.rollback();
                    conn.release();
                    return res.status(400).json({ message: 'Invalid product list' });
                }
                const placeholders = ids.map(() => '?').join(',');
                const [rows] = await conn.query(
                    `SELECT p.id_producto, p.precio, p.nombre_producto, COALESCE(i.stock,0) as stock
                     FROM productos p
                     LEFT JOIN inventario i ON i.id_producto = p.id_producto
                     WHERE p.id_producto IN (${placeholders}) FOR UPDATE`, ids);
                const byId = new Map(rows.map(r => [String(r.id_producto), r]));

                // Validate stock and compute total
                let orderTotal = 0;
                for (const item of cartProducts) {
                    const r = byId.get(String(item.productId));
                    const qty = Number(item.quantity || 0);
                    if (!r || qty <= 0) {
                        await conn.rollback(); conn.release();
                        return res.status(400).json({ message: `Invalid product ${item.productId}` });
                    }
                    if (r.stock < qty) {
                        await conn.rollback(); conn.release();
                        return res.status(400).json({ message: `Insufficient stock for product ${item.productId}` });
                    }
                    orderTotal += Number(r.precio) * qty;
                }

                // Insert order
                const [insOrder] = await conn.query(
                    'INSERT INTO pedidos (id_cliente, estado_pedido, total_pedido) VALUES (?, ?, ?)',
                    [Number(clientId), 'Pendiente', orderTotal]
                );
                const orderId = insOrder.insertId;

                // Insert details and update stock
                for (const item of cartProducts) {
                    const r = byId.get(String(item.productId));
                    const qty = Number(item.quantity || 0);
                    await conn.query(
                        'INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
                        [orderId, Number(item.productId), qty, Number(r.precio)]
                    );
                    await conn.query(
                        'UPDATE inventario SET stock = stock - ? WHERE id_producto = ?',
                        [qty, Number(item.productId)]
                    );
                }

                await conn.commit();
                conn.release();
                return res.status(201).json({
                    message: 'Order created',
                    order: { id: String(orderId), clientId: String(clientId), total: orderTotal, status: 'pending', date: new Date().toISOString() }
                });
            } catch (txErr) {
                try { await conn.rollback(); } catch (_) {}
                conn.release();
                console.error(txErr);
                return res.status(500).json({ message: 'server error' });
            }
        }

        // JSON fallback
        const allProducts = readData('products.json');
        let orderTotal = 0;
        const productsInOrder = [];
        for (const item of cartProducts) {
            const product = allProducts.find(p => p.id === item.productId);
            if (!product || product.stock < item.quantity) {
                return res.status(400).json({ message: `Product ${item.productId} is out of stock or insufficient quantity.` });
            }
            productsInOrder.push({ productId: product.id, name: product.name, quantity: item.quantity, price: product.price });
            orderTotal += product.price * item.quantity;
            updateProductStock(product.id, -item.quantity);
        }
        const orders = readData('orders.json');
        const newOrder = { id: uuidv4(), clientId, products: productsInOrder, total: orderTotal, status: 'pending', date: new Date().toISOString() };
        orders.push(newOrder);
        writeData('orders.json', orders);
        return res.status(201).json({ message: 'Order created', order: newOrder });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// --- Cliente: Obtener sus pedidos ---
router.get('/my-orders/:clientId', authorize(['client']), async (req, res) => {
    try {
        const { clientId } = req.params;
        if (USE_DB) {
            const rows = await query('SELECT * FROM pedidos WHERE id_cliente = ? ORDER BY id_pedido DESC', [clientId]);
            return res.json(rows.map(mapDbOrderRow));
        }
        const orders = readData('orders.json');
        const clientOrders = orders.filter(o => o.clientId === clientId);
        return res.json(clientOrders);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// --- Empleado o Admin: Obtener todos los pedidos ---
router.get('/', authorize(['employee', 'admin']), async (req, res) => {
    try {
        if (USE_DB) {
            const rows = await query('SELECT * FROM pedidos ORDER BY id_pedido DESC');
            return res.json(rows.map(mapDbOrderRow));
        }
        const orders = readData('orders.json');
        return res.json(orders);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// --- Empleado o Admin: Procesar/Actualizar estado de un pedido ---
async function updateStatusDb(id, status) {
    // Map frontend statuses to DB values
    const map = { pending: 'Pendiente', shipped: 'Enviado', completed: 'Completado', cancelled: 'Cancelado' };
    const dbStatus = map[String(status).toLowerCase()] || status;
    const result = await query('UPDATE pedidos SET estado_pedido = ? WHERE id_pedido = ?', [dbStatus, id]);
    return result.affectedRows;
}

router.put('/:id/status', authorize(['employee', 'admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (USE_DB) {
            const affected = await updateStatusDb(id, status);
            if (!affected) return res.status(404).json({ message: 'Order not found' });
            const rows = await query('SELECT * FROM pedidos WHERE id_pedido = ? LIMIT 1', [id]);
            return res.json({ message: 'Order status updated', order: rows.length ? mapDbOrderRow(rows[0]) : null });
        }
        const orders = readData('orders.json');
        const orderIndex = orders.findIndex(o => o.id === id);
        if (orderIndex === -1) return res.status(404).json({ message: 'Order not found' });
        orders[orderIndex].status = status; // 'shipped','completed','cancelled'
        writeData('orders.json', orders);
        return res.json({ message: 'Order status updated', order: orders[orderIndex] });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// Compatibilidad con apiService.updateOrderStatus(/orders/:id)
router.put('/:id', authorize(['employee', 'admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body || {};
        if (!status) return res.status(400).json({ message: 'status required' });
        if (USE_DB) {
            const affected = await updateStatusDb(id, status);
            if (!affected) return res.status(404).json({ message: 'Order not found' });
            const rows = await query('SELECT * FROM pedidos WHERE id_pedido = ? LIMIT 1', [id]);
            return res.json({ message: 'Order status updated', order: rows.length ? mapDbOrderRow(rows[0]) : null });
        }
        const orders = readData('orders.json');
        const orderIndex = orders.findIndex(o => o.id === id);
        if (orderIndex === -1) return res.status(404).json({ message: 'Order not found' });
        orders[orderIndex].status = status;
        writeData('orders.json', orders);
        return res.json({ message: 'Order status updated', order: orders[orderIndex] });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

module.exports = router;