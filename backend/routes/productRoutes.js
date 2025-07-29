const express = require('express');
const router = express.Router();
const { readData, writeData, uuidv4, updateProductStock, findProducts } = require('../utils/dataHandler');

const authorizeAdmin = (req, res, next) => {
    const userRole = req.headers['x-user-role'];
    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
    next();
};

// Obtener todos los productos (accesible por todos)
router.get('/', (req, res) => {
    const products = findProducts(''); // Devuelve todos los productos
    res.json(products);
});

// Obtener producto por ID
router.get('/:id', (req, res) => {
    const products = readData('products.json');
    const product = products.find(p => p.id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Añadir producto (solo Admin)
router.post('/', authorizeAdmin, (req, res) => {
    const { name, description, price, stock, category } = req.body;
    if (!name || !price || !stock || !category) {
        return res.status(400).json({ message: 'Missing required product fields.' });
    }
    const products = readData('products.json');
    const newProduct = { id: uuidv4(), name, description, price, stock, category };
    products.push(newProduct);
    writeData('products.json', products);
    res.status(201).json({ message: 'Product added', product: newProduct });
});

// Actualizar producto (solo Admin)
router.put('/:id', authorizeAdmin, (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    let products = readData('products.json');
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products[productIndex] = { ...products[productIndex], ...updatedFields };
    writeData('products.json', products);
    res.json({ message: 'Product updated', product: products[productIndex] });
});

// Eliminar producto (solo Admin)
router.delete('/:id', authorizeAdmin, (req, res) => {
    const { id } = req.params;
    let products = readData('products.json');
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);

    if (products.length === initialLength) {
        return res.status(404).json({ message: 'Product not found' });
    }

    writeData('products.json', products);
    res.json({ message: 'Product deleted' });
});

module.exports = router;