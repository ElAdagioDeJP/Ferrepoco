const express = require('express');
const router = express.Router();
const { readData, writeData, uuidv4, updateProductStock, findProducts } = require('../utils/dataHandler');
const { authenticate, authorize } = require('../src/middleware/auth');
const { USE_DB, query } = require('../src/db');

// Helper: ensure category exists and return id_categoria
async function ensureCategory(categoryName) {
    if (!USE_DB) return null;
    if (!categoryName) return null;
    const name = String(categoryName).trim();
    if (!name) return null;
    const found = await query('SELECT id_categoria FROM categorias WHERE LOWER(nombre_categoria) = LOWER(?) LIMIT 1', [name]);
    if (found?.length) return found[0].id_categoria;
    const ins = await query('INSERT INTO categorias (nombre_categoria) VALUES (?)', [name]);
    return ins.insertId;
}

function mapDbProductRow(r) {
    return {
        id: String(r.id_producto),
        name: r.nombre_producto,
        description: r.descripcion,
        price: Number(r.precio),
        stock: Number(r.stock ?? 0),
    category: r.categoria || r.nombre_categoria || null,
    imageUrl: r.url_imagen || null,
    };
}

// Obtener todos los productos (accesible por todos)
router.get('/', async (req, res) => {
    try {
        if (USE_DB) {
            try {
                const rows = await query(`
                    SELECT p.id_producto, p.nombre_producto, p.descripcion, p.precio,
                                 i.stock, c.nombre_categoria AS categoria,
                                 (SELECT ip.url_imagen FROM imagenes_producto ip WHERE ip.id_producto = p.id_producto ORDER BY posicion ASC LIMIT 1) AS url_imagen
                    FROM productos p
                    LEFT JOIN inventario i ON i.id_producto = p.id_producto
                    LEFT JOIN categorias c ON c.id_categoria = p.id_categoria
                    ORDER BY p.id_producto DESC
                `);
                return res.json(rows.map(mapDbProductRow));
            } catch (err) {
                // Retry without images if the table doesn't exist
                const rows = await query(`
                    SELECT p.id_producto, p.nombre_producto, p.descripcion, p.precio,
                                 i.stock, c.nombre_categoria AS categoria
                    FROM productos p
                    LEFT JOIN inventario i ON i.id_producto = p.id_producto
                    LEFT JOIN categorias c ON c.id_categoria = p.id_categoria
                    ORDER BY p.id_producto DESC
                `);
                return res.json(rows.map(mapDbProductRow));
            }
        }
        const products = findProducts('');
        return res.json(products);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// Obtener productos por id de categoría (query param ?categoryId=)
router.get('/by-category/:categoryId', async (req, res) => {
    try {
        if (USE_DB) {
            const id = Number(req.params.categoryId)
            if (!Number.isInteger(id)) return res.status(400).json({ message: 'Categoría inválida' })
            const rows = await query(`
                SELECT p.id_producto, p.nombre_producto, p.descripcion, p.precio,
                               i.stock, c.nombre_categoria AS categoria,
                               (SELECT ip.url_imagen FROM imagenes_producto ip WHERE ip.id_producto = p.id_producto ORDER BY posicion ASC LIMIT 1) AS url_imagen
                FROM productos p
                LEFT JOIN inventario i ON i.id_producto = p.id_producto
                LEFT JOIN categorias c ON c.id_categoria = p.id_categoria
                WHERE p.id_categoria = ?
                ORDER BY p.id_producto DESC
            `, [id]);
            return res.json(rows.map(mapDbProductRow));
        }
        // JSON fallback: filter by category name equality if provided via query ?name=
        const all = readData('products.json');
        const name = (req.query.name || '').toString().toLowerCase();
        const filtered = name ? all.filter(p => (p.category || '').toLowerCase() === name) : all;
        return res.json(filtered);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// Obtener producto por ID
router.get('/:id', async (req, res) => {
    try {
        if (USE_DB) {
            const id = req.params.id;
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
                if (!rows.length) return res.status(404).json({ message: 'Product not found' });
                return res.json(mapDbProductRow(rows[0]));
            } catch (err) {
                const rows = await query(`
                    SELECT p.id_producto, p.nombre_producto, p.descripcion, p.precio,
                                 i.stock, c.nombre_categoria AS categoria
                    FROM productos p
                    LEFT JOIN inventario i ON i.id_producto = p.id_producto
                    LEFT JOIN categorias c ON c.id_categoria = p.id_categoria
                    WHERE p.id_producto = ?
                    LIMIT 1
                `, [id]);
                if (!rows.length) return res.status(404).json({ message: 'Product not found' });
                return res.json(mapDbProductRow(rows[0]));
            }
        }
        const products = readData('products.json');
        const product = products.find(p => p.id === req.params.id);
        if (product) return res.json(product);
        return res.status(404).json({ message: 'Product not found' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// Añadir producto (solo Admin)
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const { name, description = '', price, stock = 0, category } = req.body;
        if (!name || price === undefined || price === null || category === undefined || category === null) {
            return res.status(400).json({ message: 'Missing required product fields.' });
        }

        if (USE_DB) {
            const catId = await ensureCategory(category);
            const ins = await query(
                'INSERT INTO productos (nombre_producto, descripcion, precio, id_categoria) VALUES (?, ?, ?, ?)',
                [name, description, Number(price), catId]
            );
            const productId = ins.insertId;
            // create or upsert inventory
            await query('INSERT INTO inventario (id_producto, stock) VALUES (?, ?) ON DUPLICATE KEY UPDATE stock = VALUES(stock)', [productId, Number(stock || 0)]);
            const rows = await query(`
                SELECT p.id_producto, p.nombre_producto, p.descripcion, p.precio,
                             i.stock, c.nombre_categoria AS categoria
                FROM productos p
                LEFT JOIN inventario i ON i.id_producto = p.id_producto
                LEFT JOIN categorias c ON c.id_categoria = p.id_categoria
                WHERE p.id_producto = ?
            `, [productId]);
            return res.status(201).json({ message: 'Product added', product: mapDbProductRow(rows[0]) });
        }

        const products = readData('products.json');
        const newProduct = { id: uuidv4(), name, description, price, stock, category };
        products.push(newProduct);
        writeData('products.json', products);
        return res.status(201).json({ message: 'Product added', product: newProduct });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// Actualizar producto (solo Admin)
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, category } = req.body;

        if (USE_DB) {
            const updates = [];
            const params = [];
            if (name !== undefined) { updates.push('nombre_producto = ?'); params.push(name); }
            if (description !== undefined) { updates.push('descripcion = ?'); params.push(description); }
            if (price !== undefined) { updates.push('precio = ?'); params.push(Number(price)); }
            if (category !== undefined) {
                const catId = await ensureCategory(category);
                updates.push('id_categoria = ?'); params.push(catId);
            }
            if (updates.length) {
                params.push(id);
                const result = await query(`UPDATE productos SET ${updates.join(', ')} WHERE id_producto = ?`, params);
                if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
            }
            if (stock !== undefined) {
                await query('INSERT INTO inventario (id_producto, stock) VALUES (?, ?) ON DUPLICATE KEY UPDATE stock = VALUES(stock)', [id, Number(stock)]);
            }
            const rows = await query(`
                SELECT p.id_producto, p.nombre_producto, p.descripcion, p.precio,
                             i.stock, c.nombre_categoria AS categoria
                FROM productos p
                LEFT JOIN inventario i ON i.id_producto = p.id_producto
                LEFT JOIN categorias c ON c.id_categoria = p.id_categoria
                WHERE p.id_producto = ?
                LIMIT 1
            `, [id]);
            return res.json({ message: 'Product updated', product: rows.length ? mapDbProductRow(rows[0]) : null });
        }

        const updatedFields = req.body;
        let products = readData('products.json');
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });
        products[productIndex] = { ...products[productIndex], ...updatedFields };
        writeData('products.json', products);
        return res.json({ message: 'Product updated', product: products[productIndex] });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// Eliminar producto (solo Admin)
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        if (USE_DB) {
            // Remove inventory first due to FK without cascade
            await query('DELETE FROM inventario WHERE id_producto = ?', [id]);
            const result = await query('DELETE FROM productos WHERE id_producto = ?', [id]);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
            return res.json({ message: 'Product deleted' });
        }
        let products = readData('products.json');
        const initialLength = products.length;
        products = products.filter(p => p.id !== id);
        if (products.length === initialLength) return res.status(404).json({ message: 'Product not found' });
        writeData('products.json', products);
        return res.json({ message: 'Product deleted' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

module.exports = router;