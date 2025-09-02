const express = require('express');
const router = express.Router();
const { readData, updateProductStock } = require('../utils/dataHandler');
const { authorize } = require('../src/middleware/auth');
const { USE_DB, query } = require('../src/db');

const MIN_STOCK_THRESHOLD = 10; // Umbral para alertas de bajo stock

// Actualizar stock de producto (Admin o Empleado)
router.put('/stock/:productId', authorize(['admin', 'employee']), async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity, motivo } = req.body; // 'motivo' es opcional
        if (quantity === undefined) {
            return res.status(400).json({ message: 'Quantity is required.' });
        }

        if (USE_DB) {
            const id = Number(productId);
            const delta = Number(quantity);
            if (!Number.isFinite(id)) return res.status(400).json({ message: 'Invalid productId' });
            if (!Number.isFinite(delta) || !delta) return res.status(400).json({ message: 'Invalid quantity' });

            // Actualizar stock (no negativo)
            const upd = await query('UPDATE inventario SET stock = GREATEST(stock + ?, 0) WHERE id_producto = ?', [delta, id]);
            if (upd.affectedRows === 0) {
                // Si no existía inventario, insertar con stock no negativo
                const initial = Math.max(delta, 0);
                await query('INSERT INTO inventario (id_producto, stock) VALUES (?, ?) ON DUPLICATE KEY UPDATE stock = GREATEST(stock + VALUES(stock), 0)', [id, initial]);
            }

            // Devolver producto actualizado
            let row;
            try {
                const rows = await query(`
                    SELECT p.id_producto, p.nombre_producto, p.descripcion, p.precio,
                                   i.stock, c.nombre_categoria AS categoria,
                                   (SELECT ip.url_imagen FROM imagenes_producto ip WHERE ip.id_producto = p.id_producto ORDER BY posicion ASC LIMIT 1) AS url_imagen
                    FROM productos p
                    LEFT JOIN inventario i ON i.id_producto = p.id_producto
                    LEFT JOIN categorias c ON c.id_categoria = p.id_categoria
                    WHERE p.id_producto = ?
                    LIMIT 1
                `, [id]);
                row = rows[0];
            } catch (_) {
                const rows = await query(`
                    SELECT p.id_producto, p.nombre_producto, p.descripcion, p.precio,
                                   i.stock, c.nombre_categoria AS categoria
                    FROM productos p
                    LEFT JOIN inventario i ON i.id_producto = p.id_producto
                    LEFT JOIN categorias c ON c.id_categoria = p.id_categoria
                    WHERE p.id_producto = ?
                    LIMIT 1
                `, [id]);
                row = rows[0];
            }
            if (!row) return res.status(404).json({ message: 'Product not found' });
            return res.json({
                message: 'Stock updated successfully',
                product: {
                    id: String(row.id_producto),
                    name: row.nombre_producto,
                    description: row.descripcion,
                    price: Number(row.precio),
                    stock: Number(row.stock || 0),
                    category: row.categoria || null,
                    imageUrl: row.url_imagen || null,
                    motivo: motivo || null
                }
            });
        }

        // Fallback JSON (solo si DB deshabilitada)
        const updatedProduct = motivo
            ? updateProductStock(productId, quantity, motivo)
            : updateProductStock(productId, quantity);
        if (updatedProduct) return res.json({ message: 'Stock updated successfully', product: updatedProduct });
        return res.status(404).json({ message: 'Product not found' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// Generar alertas de bajo stock (Admin o Empleado)
// --- Polimorfismo en Tiempo de Compilación (Sobrecarga de Método: generarAlertas) ---
// Aquí simulamos dos versiones: una general y otra filtrada por tipo de alerta (aunque simple)
router.get('/alerts', authorize(['admin', 'employee']), async (req, res) => {
    try {
        const { type } = req.query; // 'type' para simular la sobrecarga (ej. ?type=low_stock)
        const threshold = Number(req.query.threshold || MIN_STOCK_THRESHOLD);
        let alerts = [];

        if (USE_DB) {
            if (type === 'low_stock' || !type) {
                const rows = await query(`
                    SELECT p.id_producto AS id, p.nombre_producto AS name, COALESCE(i.stock,0) AS stock
                    FROM productos p
                    LEFT JOIN inventario i ON i.id_producto = p.id_producto
                    WHERE COALESCE(i.stock,0) <= ?
                    ORDER BY stock ASC, p.id_producto ASC
                `, [threshold]);
                alerts = rows.map(r => ({
                    productId: String(r.id),
                    productName: r.name,
                    currentStock: Number(r.stock || 0),
                    threshold,
                    message: `Low stock: ${r.name} has only ${r.stock || 0} units left.`,
                    type: 'low_stock'
                }));
            }
            return res.json(alerts);
        }

        // Fallback JSON
        const products = readData('products.json');
        if (type === 'low_stock' || !type) {
            for (const p of products) {
                if ((p.stock || 0) <= threshold) {
                    alerts.push({
                        productId: p.id,
                        productName: p.name,
                        currentStock: p.stock,
                        threshold,
                        message: `Low stock: ${p.name} has only ${p.stock} units left.`,
                        type: 'low_stock'
                    });
                }
            }
        }
        return res.json(alerts);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

module.exports = router;