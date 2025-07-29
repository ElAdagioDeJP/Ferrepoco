const express = require('express');
const router = express.Router();
const { readData, writeData, uuidv4 } = require('../utils/dataHandler');

// Middleware de simulación de rol (para probar sin login completo)
const authorize = (roles) => (req, res, next) => {
    // En un sistema real, aquí verificarías el token JWT del usuario
    // Por simplicidad, asumimos que el rol del usuario que hace la petición
    // está disponible (ej. req.user.role después de un middleware de auth)
    const userRole = req.headers['x-user-role']; // Asumimos que el frontend envía el rol para simular
    if (!userRole || !roles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// Obtener todos los usuarios (solo Admin)
router.get('/', authorize(['admin']), (req, res) => {
    const users = readData('users.json');
    res.json(users.map(u => ({ id: u.id, username: u.username, role: u.role }))); // No enviar contraseñas
});

// Crear usuario (solo Admin)
router.post('/', authorize(['admin']), (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const users = readData('users.json');
    const newUser = { id: uuidv4(), username, password, role };
    users.push(newUser);
    writeData('users.json', users);
    res.status(201).json({ message: 'User created', user: { id: newUser.id, username: newUser.username, role: newUser.role } });
});

// Actualizar usuario (solo Admin)
router.put('/:id', authorize(['admin']), (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const users = readData('users.json');
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (username) users[userIndex].username = username;
    if (password) users[userIndex].password = password; // En un sistema real, hashear contraseña
    if (role) users[userIndex].role = role;

    writeData('users.json', users);
    res.json({ message: 'User updated', user: { id: users[userIndex].id, username: users[userIndex].username, role: users[userIndex].role } });
});

// Eliminar usuario (solo Admin)
router.delete('/:id', authorize(['admin']), (req, res) => {
    const { id } = req.params;
    let users = readData('users.json');
    const initialLength = users.length;
    users = users.filter(u => u.id !== id);

    if (users.length === initialLength) {
        return res.status(404).json({ message: 'User not found' });
    }

    writeData('users.json', users);
    res.json({ message: 'User deleted' });
});

module.exports = router;