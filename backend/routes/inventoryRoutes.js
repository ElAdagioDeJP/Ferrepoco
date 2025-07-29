const express = require('express');
const router = express.Router();
const { readData, writeData, updateProductStock } = require('../utils/dataHandler');

const authorizeAdminOrEmployee = (req, res, next) => {
    const userRole = req.headers['x-user-role'];
    if (userRole !== 'admin' && userRole !== 'employee') {
        return res.status(403).json({ message: 'Access denied. Admin or Employee role required.' });
    }
    next();
};

const MIN_STOCK_THRESHOLD = 10; // Umbral para alertas de bajo stock

// Actualizar stock de producto (Admin o Empleado)
router.put('/stock/:productId', authorizeAdminOrEmployee, (req, res) => {
    const { productId } = req.params;
    const { quantity, motivo } = req.body; // 'motivo' es opcional para la sobrecarga

    if (quantity === undefined) {
        return res.status(400).json({ message: 'Quantity is required.' });
    }

    // --- Polimorfismo en Tiempo de Compilación (Sobrecarga de Método: actualizarStock) ---
    let updatedProduct;
    if (motivo) {
        updatedProduct = updateProductStock(productId, quantity, motivo); // Llama a la versión con motivo
    } else {
        updatedProduct = updateProductStock(productId, quantity); // Llama a la versión sin motivo
    }

    if (updatedProduct) {
        res.json({ message: 'Stock updated successfully', product: updatedProduct });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Generar alertas de bajo stock (Admin o Empleado)
// --- Polimorfismo en Tiempo de Compilación (Sobrecarga de Método: generarAlertas) ---
// Aquí simulamos dos versiones: una general y otra filtrada por tipo de alerta (aunque simple)
router.get('/alerts', authorizeAdminOrEmployee, (req, res) => {
    const { type } = req.query; // 'type' para simular la sobrecarga (ej. ?type=low_stock)
    const products = readData('products.json');
    let alerts = [];

    if (type === 'low_stock' || !type) { // Si no se especifica tipo, o es 'low_stock'
        products.forEach(p => {
            if (p.stock <= MIN_STOCK_THRESHOLD) {
                alerts.push({
                    productId: p.id,
                    productName: p.name,
                    currentStock: p.stock,
                    threshold: MIN_STOCK_THRESHOLD,
                    message: `Low stock: ${p.name} has only ${p.stock} units left.`,
                    type: 'low_stock'
                });
            }
        });
    }

    // Podríamos añadir más lógica para otros 'types' de alerta aquí
    // if (type === 'expired_soon') { ... }

    if (alerts.length > 0) {
        res.json(alerts);
    } else {
        res.status(200).json({ message: 'No alerts generated or no matching alerts found.' });
    }
});

module.exports = router;