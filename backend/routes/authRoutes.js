const express = require('express');
const router = express.Router();
const { readData, writeData, uuidv4 } = require('../utils/dataHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authenticate } = require('../src/middleware/auth');
const { USE_DB, query } = require('../src/db');

const JWT_SECRET = process.env.JWT_SECRET || 'ferrepoco_super_secret_key';

function normalizeRole(dbRole) {
    if (!dbRole) return 'client';
    const r = String(dbRole).toLowerCase();
    if (r.startsWith('admin')) return 'admin';
    if (r.startsWith('emple')) return 'employee';
    if (r.startsWith('client') || r.startsWith('clien')) return 'client';
    return r;
}

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
            if (!userRecord) return res.status(401).json({ message: 'Invalid credentials' });
            const ok = await bcrypt.compare(password, userRecord.password);
            if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
            userRecord.role = normalizeRole(userRecord.role);
        } else {
            const users = readData('users.json');
            const idx = users.findIndex(u => u.username === username);
            userRecord = idx >= 0 ? users[idx] : null;
            // Soportar contraseñas en texto plano de los datos semilla y migrarlas a hash en el primer login correcto
            if (userRecord) {
                const stored = userRecord.password || '';
                let match = false;
                try {
                    // Si parece un hash bcrypt ($2), usar compare; si no, comparar texto plano
                    if (typeof stored === 'string' && stored.startsWith('$2')) {
                        match = await bcrypt.compare(password, stored);
                    } else {
                        match = password === stored;
                    }
                } catch (cmpErr) {
                    // Si el hash está corrupto, rechazar
                    match = false;
                }
                if (!match) return res.status(401).json({ message: 'Invalid credentials' });

                // Migrar a hash si estaba en texto plano
                if (!(typeof stored === 'string' && stored.startsWith('$2'))) {
                    try {
                        const hashed = await bcrypt.hash(password, 10);
                        users[idx].password = hashed;
                        writeData('users.json', users);
                        userRecord = users[idx];
                    } catch (hashErr) {
                        // Continuar sin bloquear el login si el hash falla por IO; el próximo login volverá a intentar
                        console.error('Password migration failed:', hashErr.message);
                    }
                }
            }
        }
        if (!userRecord) return res.status(401).json({ message: 'Invalid credentials' });
        // Nota: cuando USE_DB=true ya se validó arriba con bcrypt.compare

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