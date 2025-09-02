const express = require('express');
const router = express.Router();
const { readData } = require('../utils/dataHandler');
const { USE_DB, query } = require('../src/db');

// Sales summary
router.get('/sales', async (req, res) => {
	try {
		if (USE_DB) {
			const rows = await query('SELECT estado_pedido, COUNT(*) AS cnt, SUM(total_pedido) AS total FROM pedidos GROUP BY estado_pedido');
			const byStatus = {};
			let count = 0;
			let total = 0;
			for (const r of rows) {
				const key = String(r.estado_pedido || '').toLowerCase();
				byStatus[key] = Number(r.cnt || 0);
				count += Number(r.cnt || 0);
				total += Number(r.total || 0);
			}
			return res.json({ count, total, byStatus });
		}
		const orders = readData('orders.json');
		const total = orders.reduce((sum, o) => sum + (o.total || 0), 0);
		const byStatus = orders.reduce((acc, o) => {
			acc[o.status] = (acc[o.status] || 0) + 1;
			return acc;
		}, {});
		return res.json({ count: orders.length, total, byStatus });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ message: 'server error' });
	}
});

// Top products by quantity
router.get('/top-products', async (req, res) => {
	try {
		if (USE_DB) {
			const rows = await query(`
				SELECT dp.id_producto AS productId,
					   SUM(dp.cantidad) AS quantity,
					   p.nombre_producto AS name
				FROM detalle_pedido dp
				LEFT JOIN productos p ON p.id_producto = dp.id_producto
				GROUP BY dp.id_producto, p.nombre_producto
				ORDER BY quantity DESC
				LIMIT 10
			`);
			return res.json(rows.map(r => ({ productId: String(r.productId), quantity: Number(r.quantity || 0), name: r.name })));
		}
		const orders = readData('orders.json');
		const tally = {};
		for (const o of orders) {
			for (const p of o.products || []) {
				tally[p.productId] = (tally[p.productId] || 0) + (p.quantity || 0);
			}
		}
		const products = readData('products.json');
		const result = Object.entries(tally)
			.map(([productId, qty]) => ({
				productId,
				quantity: qty,
				name: products.find(p => p.id === productId)?.name || 'Unknown',
			}))
			.sort((a, b) => b.quantity - a.quantity)
			.slice(0, 10);
		return res.json(result);
	} catch (e) {
		console.error(e);
		return res.status(500).json({ message: 'server error' });
	}
});

// Low stock report
router.get('/low-stock', async (req, res) => {
	try {
		const threshold = Number(req.query.threshold || 10);
		if (USE_DB) {
			const rows = await query(`
				SELECT p.id_producto AS id, p.nombre_producto AS name, COALESCE(i.stock,0) AS stock
				FROM productos p
				LEFT JOIN inventario i ON i.id_producto = p.id_producto
				WHERE COALESCE(i.stock,0) <= ?
				ORDER BY stock ASC
			`, [threshold]);
			return res.json(rows.map(r => ({ id: String(r.id), name: r.name, stock: Number(r.stock || 0) })));
		}
		const products = readData('products.json');
		const low = products.filter(p => (p.stock || 0) <= threshold);
		return res.json(low);
	} catch (e) {
		console.error(e);
		return res.status(500).json({ message: 'server error' });
	}
});

module.exports = router;
