const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Para generar IDs únicos

const dataPath = path.join(__dirname, '..', 'data');

function ensureDataDir() {
    try {
        if (!fs.existsSync(dataPath)) {
            fs.mkdirSync(dataPath, { recursive: true });
        }
    } catch (e) {
        console.error('Error ensuring data directory:', e.message);
    }
}

const readData = (fileName) => {
    try {
        ensureDataDir();
        const filePath = path.join(dataPath, fileName);
        if (!fs.existsSync(filePath)) {
            // initialize missing file with empty array
            fs.writeFileSync(filePath, '[]', 'utf8');
        }
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error(`Error reading ${fileName}:`, error.message);
        return [];
    }
};

const writeData = (fileName, data) => {
    try {
        ensureDataDir();
        const filePath = path.join(dataPath, fileName);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error writing to ${fileName}:`, error.message);
    }
};

// --- Implementación de Métodos Polimórficos de Compilación (Sobrecarga) ---

// Para Producto.actualizarStock()
const updateProductStock = (productId, quantity, motivo = null) => {
    const products = readData('products.json');
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
        const product = products[productIndex];
        product.stock += quantity; // Si quantity es negativo, resta; si es positivo, suma

        // Opcional: registrar el movimiento con motivo
        if (motivo) {
            console.log(`Stock updated for ${product.name}: ${quantity} units. Reason: ${motivo}`);
            // Aquí se podría añadir lógica para guardar historial de movimientos de stock
        } else {
            console.log(`Stock updated for ${product.name}: ${quantity} units.`);
        }
        
        products[productIndex] = product;
        writeData('products.json', products);
        return product;
    }
    return null;
};

// Para Cliente.buscarProducto() - Se simulará en el frontend principalmente
// Aquí podríamos tener funciones que interactúen con la lista de productos:
const findProducts = (criteria) => {
    const products = readData('products.json');
    if (typeof criteria === 'string') { // Buscar por nombre o categoría
        return products.filter(p =>
            p.name.toLowerCase().includes(criteria.toLowerCase()) ||
            p.category.toLowerCase().includes(criteria.toLowerCase())
        );
    } else if (typeof criteria === 'object' && criteria.priceMin !== undefined && criteria.priceMax !== undefined) {
        return products.filter(p => p.price >= criteria.priceMin && p.price <= criteria.priceMax);
    }
    return products; // Si no hay criterios, devuelve todos
};

module.exports = {
    readData,
    writeData,
    uuidv4,
    updateProductStock,
    findProducts
};