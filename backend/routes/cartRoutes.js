const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../utils/dataHandler');

// Get current user's cart
router.get('/', (req, res) => {
	const userId = req.user?.id;
	const carts = readData('carts.json') || [];
	const cart = carts.find(c => c.userId === userId) || { userId, items: [] };
	res.json(cart);
});

// Add or update item in cart
router.post('/items', (req, res) => {
	const userId = req.user?.id;
	const { productId, quantity } = req.body;
	if (!productId || !quantity || quantity < 1) return res.status(400).json({ message: 'productId and quantity >= 1 required' });
	let carts = readData('carts.json') || [];
	let cart = carts.find(c => c.userId === userId);
	if (!cart) {
		cart = { userId, items: [] };
		carts.push(cart);
	}
	const idx = cart.items.findIndex(i => i.productId === productId);
	if (idx >= 0) cart.items[idx].quantity = quantity; else cart.items.push({ productId, quantity });
	writeData('carts.json', carts);
	res.status(201).json(cart);
});

// Remove item
router.delete('/items/:productId', (req, res) => {
	const userId = req.user?.id;
	const { productId } = req.params;
	let carts = readData('carts.json') || [];
	const cart = carts.find(c => c.userId === userId);
	if (!cart) return res.status(404).json({ message: 'Cart not found' });
	cart.items = cart.items.filter(i => i.productId !== productId);
	writeData('carts.json', carts);
	res.json(cart);
});

// Clear cart
router.delete('/', (req, res) => {
	const userId = req.user?.id;
	let carts = readData('carts.json') || [];
	const cart = carts.find(c => c.userId === userId);
	if (cart) cart.items = [];
	writeData('carts.json', carts);
	res.json({ message: 'Cart cleared' });
});

module.exports = router;
