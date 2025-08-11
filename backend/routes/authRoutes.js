const express = require('express');
const router = express.Router();
const { readData, writeData, uuidv4 } = require('../utils/dataHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authenticate } = require('../src/middleware/auth');
const { USE_DB, query } = require('../src/db');

const JWT_SECRET = process.env.JWT_SECRET || 'ferrepoco_super_secret_key';

// Register new user (client only from public endpoint)
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'username and password required' });
        const hashed = await bcrypt.hash(password, 10);
            if (USE_DB) {
                // Force role to client on public registration
                const role = 'client';
                const roleId = 3;
                const rows = await query('INSERT INTO usuarios (nombre, apellido, correo_electronico, contrasena, id_rol) VALUES (?, ?, ?, ?, ?)', ['','', username, hashed, roleId]);
                const id = rows.insertId?.toString() || uuidv4();
                return res.status(201).json({ message: 'registered', user: { id, username, role } });
        } else {
            const users = readData('users.json');
            if (users.find(u => u.username === username)) return res.status(409).json({ message: 'username already exists' });
            const role = 'client';
            const user = { id: uuidv4(), username, password: hashed, role };
            users.push(user);
            writeData('users.json', users);
            return res.status(201).json({ message: 'registered', user: { id: user.id, username, role } });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'username and password required' });
        let userRecord = null;
        if (USE_DB) {
            const rows = await query('SELECT u.id_usuario as id, u.correo_electronico as username, u.contrasena as password, r.nombre_rol as role FROM usuarios u LEFT JOIN roles r ON u.id_rol = r.id_rol WHERE u.correo_electronico = ? LIMIT 1', [username]);
            userRecord = rows[0];
        } else {
            const users = readData('users.json');
            userRecord = users.find(u => u.username === username);
        }
        if (!userRecord) return res.status(401).json({ message: 'Invalid credentials' });
        const match = await bcrypt.compare(password, userRecord.password || password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: String(userRecord.id), username: userRecord.username, role: userRecord.role }, JWT_SECRET, { expiresIn: '8h' });
        return res.json({ message: 'Login successful', user: { id: String(userRecord.id), username: userRecord.username, role: userRecord.role, token } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
});

// Profile
router.get('/me', authenticate, (req, res) => {
    return res.json({ user: req.user });
});

module.exports = router;