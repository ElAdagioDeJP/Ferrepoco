const express = require('express');
const router = express.Router();
const { readData } = require('../utils/dataHandler');

// Sales summary
router.get('/sales', (req, res) => {
	const orders = readData('orders.json');
	const total = orders.reduce((sum, o) => sum + (o.total || 0), 0);
	const byStatus = orders.reduce((acc, o) => {
		acc[o.status] = (acc[o.status] || 0) + 1;
		return acc;
	}, {});
	res.json({ count: orders.length, total, byStatus });
});

// Top products by quantity
router.get('/top-products', (req, res) => {
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
	res.json(result);
});

// Low stock report
router.get('/low-stock', (req, res) => {
	const threshold = Number(req.query.threshold || 10);
	const products = readData('products.json');
	const low = products.filter(p => (p.stock || 0) <= threshold);
	res.json(low);
});

module.exports = router;
