const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../utils/dataHandler');
const { USE_DB, query } = require('../src/db');

// En modo DB, usaremos un carrito en memoria por sesión de servidor (por usuario)
// para evitar cualquier escritura en disco.
const memoryCarts = new Map(); // key: userId -> { userId, items: [{productId, quantity}] }

// Get current user's cart
router.get('/', async (req, res) => {
	const userId = req.user?.id;
	let cart;
	if (USE_DB) {
		cart = memoryCarts.get(userId) || { userId, items: [] };
	} else {
		const carts = readData('carts.json') || [];
		cart = carts.find(c => c.userId === userId) || { userId, items: [] };
	}
	// Normalize and merge duplicates by productId
	const map = new Map();
	for (const it of cart.items || []) {
		const pid = String(it.productId);
		const qty = Number(it.quantity || 0);
		if (!map.has(pid)) map.set(pid, 0);
		map.set(pid, map.get(pid) + qty);
	}
	const normalizedItems = Array.from(map.entries()).map(([pid, qty]) => ({ productId: pid, quantity: qty }));
	if ((cart.items || []).length !== normalizedItems.length) {
		cart.items = normalizedItems;
		if (USE_DB) {
			memoryCarts.set(userId, cart);
		} else {
			const carts = readData('carts.json') || [];
			const idx = carts.findIndex(c => c.userId === userId);
			if (idx >= 0) carts[idx] = cart; else carts.push(cart);
			writeData('carts.json', carts);
		}
	}
	try {
	if (USE_DB && cart.items.length) {
			const ids = cart.items.map(i => Number(i.productId)).filter(Boolean);
			if (ids.length) {
				const placeholders = ids.map(() => '?').join(',');
				let rows;
				try {
					rows = await query(`
						SELECT p.id_producto, p.nombre_producto, p.descripcion, p.precio,
							   i.stock, c.nombre_categoria AS categoria,
							   (SELECT ip.url_imagen FROM imagenes_producto ip WHERE ip.id_producto = p.id_producto ORDER BY posicion ASC LIMIT 1) AS url_imagen
						FROM productos p
						LEFT JOIN inventario i ON i.id_producto = p.id_producto
						LEFT JOIN categorias c ON c.id_categoria = p.id_categoria
						WHERE p.id_producto IN (${placeholders})
					`, ids);
				} catch (err) {
					// retry without images table
					rows = await query(`
						SELECT p.id_producto, p.nombre_producto, p.descripcion, p.precio,
							   i.stock, c.nombre_categoria AS categoria
						FROM productos p
						LEFT JOIN inventario i ON i.id_producto = p.id_producto
						LEFT JOIN categorias c ON c.id_categoria = p.id_categoria
						WHERE p.id_producto IN (${placeholders})
					`, ids);
				}
				const byId = new Map(rows.map(r => [String(r.id_producto), r]));
				const enriched = cart.items.map(it => {
					const r = byId.get(String(it.productId));
					return {
						productId: it.productId,
						quantity: it.quantity,
						product: r ? {
							id: String(r.id_producto),
							name: r.nombre_producto,
							description: r.descripcion,
							price: Number(r.precio),
							stock: Number(r.stock || 0),
							category: r.categoria || null,
							imageUrl: r.url_imagen || null
						} : null
					};
				});
				return res.json({ userId, items: enriched });
			}
		}
		// JSON fallback or empty
		return res.json(cart);
	} catch (e) {
		console.error(e);
		return res.json(cart); // still return basic cart if enrichment fails
	}
});

// Add or update item in cart
router.post('/items', (req, res) => {
	const userId = req.user?.id;
	const { productId, quantity } = req.body;
	if (!productId || !quantity || quantity < 1) return res.status(400).json({ message: 'productId and quantity >= 1 required' });

	if (USE_DB) {
		const pid = String(productId);
		let cart = memoryCarts.get(userId) || { userId, items: [] };
		const idx = cart.items.findIndex(i => String(i.productId) === pid);
		if (idx >= 0) cart.items[idx].quantity = quantity; else cart.items.push({ productId: pid, quantity });
		memoryCarts.set(userId, cart);
		return res.status(201).json(cart);
	}

	let carts = readData('carts.json') || [];
	let cart = carts.find(c => c.userId === userId);
	if (!cart) { cart = { userId, items: [] }; carts.push(cart); }
	const pid = String(productId);
	const idx = cart.items.findIndex(i => String(i.productId) === pid);
	if (idx >= 0) cart.items[idx].quantity = quantity; else cart.items.push({ productId: pid, quantity });
	writeData('carts.json', carts);
	return res.status(201).json(cart);
});

// Remove item
router.delete('/items/:productId', (req, res) => {
	const userId = req.user?.id;
	const { productId } = req.params;
	if (USE_DB) {
		const cart = memoryCarts.get(userId) || { userId, items: [] };
		const pid = String(productId);
		cart.items = (cart.items || []).filter(i => String(i.productId) !== pid);
		memoryCarts.set(userId, cart);
		return res.json(cart);
	}
	let carts = readData('carts.json') || [];
	const cart = carts.find(c => c.userId === userId);
	if (!cart) return res.status(404).json({ message: 'Cart not found' });
	const pid = String(productId);
	cart.items = cart.items.filter(i => String(i.productId) !== pid);
	writeData('carts.json', carts);
	return res.json(cart);
});

// Clear cart
router.delete('/', (req, res) => {
	const userId = req.user?.id;
	if (USE_DB) {
		const cart = memoryCarts.get(userId) || { userId, items: [] };
		cart.items = [];
		memoryCarts.set(userId, cart);
		return res.json({ message: 'Cart cleared' });
	}
	let carts = readData('carts.json') || [];
	const cart = carts.find(c => c.userId === userId);
	if (cart) cart.items = [];
	writeData('carts.json', carts);
	return res.json({ message: 'Cart cleared' });
});

module.exports = router;
