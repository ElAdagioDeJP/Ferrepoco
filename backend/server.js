require('dotenv').config();
const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
=======
const path = require('path');
const fs = require('fs');
>>>>>>> unificado
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reportRoutes = require('./routes/reportRoutes');
<<<<<<< HEAD
=======
const dbRoutes = require('./routes/dbRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
>>>>>>> unificado
const { authenticate } = require('./src/middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Permite peticiones desde el frontend Vue.js
app.use(express.json()); // Permite parsear JSON en el body de las peticiones

<<<<<<< HEAD
=======
// Static: serve uploaded files
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

>>>>>>> unificado
// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticate, userRoutes); // Requiere rol de admin (en la ruta)
app.use('/api/products', productRoutes); // Admin para CUD, todos para R
app.use('/api/inventory', authenticate, inventoryRoutes); // Admin/Empleado para stock y alertas
app.use('/api/orders', authenticate, orderRoutes); // Cliente para crear, Empleado para gestionar
app.use('/api/cart', authenticate, cartRoutes);
<<<<<<< HEAD
app.use('/api/reports', authenticate, reportRoutes);
=======
app.use('/api/payments', authenticate, paymentRoutes); // Cliente registra pago
app.use('/api/reports', authenticate, reportRoutes);
app.use('/api/db', authenticate, dbRoutes);
// static files via /api for dev proxy
app.use('/api/uploads', express.static(uploadsDir));
app.use('/api/uploads', uploadRoutes);
>>>>>>> unificado

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Ferrepoco Backend API is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});