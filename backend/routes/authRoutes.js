const express = require('express');
const router = express.Router();
const { readData } = require('../utils/dataHandler');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = readData('users.json');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // --- Polimorfismo en Tiempo de Ejecución (Sobreescritura simulada de iniciarSesion) ---
        // Aquí simulamos el comportamiento diferente post-login devolviendo el rol
        // El frontend interpretará este rol para mostrar la interfaz adecuada.
        res.json({ message: 'Login successful', user: { id: user.id, username: user.username, role: user.role } });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;