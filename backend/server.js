require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dbRoutes = require('./routes/dbRoutes');
const { authenticate } = require('./src/middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Permite peticiones desde el frontend Vue.js
app.use(express.json()); // Permite parsear JSON en el body de las peticiones

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticate, userRoutes); // Requiere rol de admin (en la ruta)
app.use('/api/products', productRoutes); // Admin para CUD, todos para R
app.use('/api/inventory', authenticate, inventoryRoutes); // Admin/Empleado para stock y alertas
app.use('/api/orders', authenticate, orderRoutes); // Cliente para crear, Empleado para gestionar
app.use('/api/cart', authenticate, cartRoutes);
app.use('/api/reports', authenticate, reportRoutes);
app.use('/api/db', authenticate, dbRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Ferrepoco Backend API is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});