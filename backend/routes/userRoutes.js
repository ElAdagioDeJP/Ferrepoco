const express = require('express');
const router = express.Router();
const { readData, writeData, uuidv4 } = require('../utils/dataHandler');
const bcrypt = require('bcryptjs');
const { authorize } = require('../src/middleware/auth');

// Obtener todos los usuarios (solo Admin)
router.get('/', authorize(['admin']), (req, res) => {
    const users = readData('users.json');
    res.json(users.map(u => ({ id: u.id, username: u.username, role: u.role })));
});

// Crear usuario (solo Admin)
router.post('/', authorize(['admin']), async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const users = readData('users.json');
    if (users.find(u => u.username === username)) return res.status(409).json({ message: 'username already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const newUser = { id: uuidv4(), username, password: hashed, role };
    users.push(newUser);
    writeData('users.json', users);
    res.status(201).json({ message: 'User created', user: { id: newUser.id, username: newUser.username, role: newUser.role } });
});

// Actualizar usuario (solo Admin)
router.put('/:id', authorize(['admin']), async (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const users = readData('users.json');
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });
    if (username) users[userIndex].username = username;
    if (password) users[userIndex].password = await bcrypt.hash(password, 10);
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
    if (users.length === initialLength) return res.status(404).json({ message: 'User not found' });
    writeData('users.json', users);
    res.json({ message: 'User deleted' });
});

module.exports = router;