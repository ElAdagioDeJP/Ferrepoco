const express = require('express');
const router = express.Router();
const { readData, writeData, uuidv4, updateProductStock } = require('../utils/dataHandler');
const { authorize } = require('../src/middleware/auth');

// --- Cliente: Crear un nuevo pedido (realizar compra) ---
router.post('/', authorize(['client']), (req, res) => {
    const { clientId, products: cartProducts } = req.body; // 'products' en el cuerpo es el carrito
    if (!clientId || !cartProducts || cartProducts.length === 0) {
        return res.status(400).json({ message: 'Client ID and products are required for an order.' });
    }

    const allProducts = readData('products.json');
    let orderTotal = 0;
    const productsInOrder = [];

    for (const item of cartProducts) {
        const product = allProducts.find(p => p.id === item.productId);
        if (!product || product.stock < item.quantity) {
            return res.status(400).json({ message: `Product ${item.productId} is out of stock or insufficient quantity.` });
        }
        productsInOrder.push({
            productId: product.id,
            name: product.name,
            quantity: item.quantity,
            price: product.price
        });
        orderTotal += product.price * item.quantity;

        // Reducir el stock del producto
        updateProductStock(product.id, -item.quantity); // Llama a la versión de sobrecarga sin motivo
    }

    const orders = readData('orders.json');
    const newOrder = {
        id: uuidv4(),
        clientId,
        products: productsInOrder,
        total: orderTotal,
        status: 'pending',
        date: new Date().toISOString()
    };
    orders.push(newOrder);
    writeData('orders.json', orders);

    // --- Simulación de Procesamiento de Pagos ---
    // En un sistema real, aquí se interactuaría con una pasarela de pago.
    // Para la simulación, simplemente confirmamos que el "pago" ha sido procesado.
    res.status(201).json({ message: 'Order created and payment simulated successfully', order: newOrder });
});

// --- Cliente: Obtener sus pedidos ---
router.get('/my-orders/:clientId', authorize(['client']), (req, res) => {
    const { clientId } = req.params;
    const orders = readData('orders.json');
    const clientOrders = orders.filter(o => o.clientId === clientId);
    res.json(clientOrders);
});

// --- Empleado o Admin: Obtener todos los pedidos ---
router.get('/', authorize(['employee', 'admin']), (req, res) => {
    const orders = readData('orders.json');
    res.json(orders);
});

// --- Empleado o Admin: Procesar/Actualizar estado de un pedido ---
router.put('/:id/status', authorize(['employee', 'admin']), (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const orders = readData('orders.json');
    const orderIndex = orders.findIndex(o => o.id === id);

    if (orderIndex === -1) {
        return res.status(404).json({ message: 'Order not found' });
    }

    orders[orderIndex].status = status; // Ej: 'shipped', 'completed', 'cancelled'
    writeData('orders.json', orders);
    res.json({ message: 'Order status updated', order: orders[orderIndex] });
});

module.exports = router;