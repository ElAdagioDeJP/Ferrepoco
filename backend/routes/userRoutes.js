const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { readData, writeData, uuidv4 } = require('../utils/dataHandler');
const bcrypt = require('bcryptjs');
const { authorize } = require('../src/middleware/auth');
const { USE_DB, query } = require('../src/db');

function normalizeRole(dbRole) {
    if (!dbRole) return 'client';
    const r = String(dbRole).toLowerCase();
    if (r.startsWith('admin')) return 'admin';
    if (r.startsWith('emple')) return 'employee';
    if (r.startsWith('client') || r.startsWith('clien')) return 'client';
    return r;
}

function mapRoleToDbName(role) {
    const r = normalizeRole(role);
    if (r === 'admin') return 'Administrador';
    if (r === 'employee') return 'Empleado';
    return 'Cliente';
}

async function getRoleIdByName(dbRoleName) {
    if (!USE_DB) return null;
    const rows = await query('SELECT id_rol FROM roles WHERE LOWER(nombre_rol) = LOWER(?) LIMIT 1', [dbRoleName]);
    if (rows && rows.length) return rows[0].id_rol;
    return 3; // default to Cliente
}

// =============== Self-service endpoints (authenticated user) ===============

// Storage for avatar uploads
const uploadsRoot = path.join(__dirname, '..', 'uploads');
const userUploadsDir = path.join(uploadsRoot, 'users');
if (!fs.existsSync(userUploadsDir)) {
    try { fs.mkdirSync(userUploadsDir, { recursive: true }); } catch { /* ignore */ }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, userUploadsDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname || '').toLowerCase();
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    }
});
const upload = multer({ storage });

// Get my profile
router.get('/me', async (req, res) => {
    try {
        const id = String(req.user.id);
        if (USE_DB) {
            const rows = await query(
                'SELECT u.id_usuario AS id, u.nombre, u.apellido, u.correo_electronico AS username, u.imagen_url AS imagen_url, r.nombre_rol AS role FROM usuarios u LEFT JOIN roles r ON u.id_rol = r.id_rol WHERE u.id_usuario = ? LIMIT 1',
                [id]
            );
            const r = rows[0];
            if (!r) return res.status(404).json({ message: 'User not found' });
            const role = normalizeRole(r.role);
            const imagen_url = r.imagen_url ? (String(r.imagen_url).startsWith('/api/') ? r.imagen_url : `/api${r.imagen_url.startsWith('/') ? '' : '/'}${r.imagen_url}`) : null;
            return res.json({ user: { id: String(r.id), username: r.username, nombre: r.nombre, apellido: r.apellido, role, imagen_url } });
        }
        const users = readData('users.json');
        const user = users.find(u => String(u.id) === id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const imagen_url = user.imagen_url ? (String(user.imagen_url).startsWith('/api/') ? user.imagen_url : `/api${user.imagen_url.startsWith('/') ? '' : '/'}${user.imagen_url}`) : null;
        return res.json({ user: { id: String(user.id), username: user.username, nombre: user.nombre, apellido: user.apellido, role: normalizeRole(user.role), imagen_url } });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// Update my profile (nombre, apellido)
router.put('/me', async (req, res) => {
    try {
        const id = String(req.user.id);
        const { nombre, apellido } = req.body;
        if (USE_DB) {
            const fields = [];
            const params = [];
            if (typeof nombre === 'string') { fields.push('nombre = ?'); params.push(nombre); }
            if (typeof apellido === 'string') { fields.push('apellido = ?'); params.push(apellido); }
            if (!fields.length) return res.json({ message: 'No changes' });
            params.push(id);
            const result = await query(`UPDATE usuarios SET ${fields.join(', ')} WHERE id_usuario = ?`, params);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
            return res.json({ message: 'Profile updated' });
        }
        const users = readData('users.json');
        const idx = users.findIndex(u => String(u.id) === id);
        if (idx === -1) return res.status(404).json({ message: 'User not found' });
        if (typeof nombre === 'string') users[idx].nombre = nombre;
        if (typeof apellido === 'string') users[idx].apellido = apellido;
        writeData('users.json', users);
        return res.json({ message: 'Profile updated' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// Change my password
router.put('/me/password', async (req, res) => {
    try {
        const id = String(req.user.id);
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) return res.status(400).json({ message: 'Missing fields' });
        if (USE_DB) {
            const rows = await query('SELECT contrasena FROM usuarios WHERE id_usuario = ? LIMIT 1', [id]);
            if (!rows.length) return res.status(404).json({ message: 'User not found' });
            const ok = await bcrypt.compare(currentPassword, rows[0].contrasena || '');
            if (!ok) return res.status(401).json({ message: 'Current password incorrect' });
            const hashed = await bcrypt.hash(newPassword, 10);
            await query('UPDATE usuarios SET contrasena = ? WHERE id_usuario = ?', [hashed, id]);
            return res.json({ message: 'Password updated' });
        }
        const users = readData('users.json');
        const idx = users.findIndex(u => String(u.id) === id);
        if (idx === -1) return res.status(404).json({ message: 'User not found' });
        const stored = users[idx].password || '';
        let ok = false;
        if (typeof stored === 'string' && stored.startsWith('$2')) ok = await bcrypt.compare(currentPassword, stored);
        else ok = currentPassword === stored;
        if (!ok) return res.status(401).json({ message: 'Current password incorrect' });
        users[idx].password = await bcrypt.hash(newPassword, 10);
        writeData('users.json', users);
        return res.json({ message: 'Password updated' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// Upload/Update my profile photo
router.post('/me/photo', upload.single('photo'), async (req, res) => {
    try {
        const id = String(req.user.id);
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
        const relPath = `/uploads/users/${req.file.filename}`;
        if (USE_DB) {
            const result = await query('UPDATE usuarios SET imagen_url = ? WHERE id_usuario = ?', [relPath, id]);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
        } else {
            const users = readData('users.json');
            const idx = users.findIndex(u => String(u.id) === id);
            if (idx === -1) return res.status(404).json({ message: 'User not found' });
            users[idx].imagen_url = relPath;
            writeData('users.json', users);
        }
        return res.status(201).json({ message: 'Photo updated', imagen_url: `/api${relPath}` });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// Obtener todos los usuarios (solo Admin)
router.get('/', authorize(['admin']), async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page || '1', 10), 1);
        let pageSize = Math.max(parseInt(req.query.pageSize || '10', 10), 1);
        // Clamp pageSize to a safe upper bound
        if (!Number.isFinite(pageSize)) pageSize = 10;
        pageSize = Math.min(Math.max(pageSize, 1), 100);

            if (USE_DB) {
                const countRows = await query('SELECT COUNT(*) AS total FROM usuarios');
                const total = countRows[0]?.total || 0;
                const offset = (page - 1) * pageSize;
                // Inline numeric LIMIT/OFFSET to avoid parameter issues in some MySQL versions
                const sql = `SELECT 
                                             u.id_usuario AS id,
                                             u.nombre,
                                             u.apellido,
                                             u.correo_electronico AS username,
                                             r.nombre_rol AS role
                                         FROM usuarios u
                                         LEFT JOIN roles r ON u.id_rol = r.id_rol
                                         ORDER BY u.id_usuario DESC
                                         LIMIT ${Number(pageSize)} OFFSET ${Number(offset)}`;
                const rows = await query(sql);
                const data = rows.map(r => {
                    const role = normalizeRole(r.role);
                    const role_label = role === 'admin' ? 'Administrador' : role === 'employee' ? 'Empleado' : 'Cliente';
                    return { id: String(r.id), username: r.username, nombre: r.nombre, apellido: r.apellido, role, role_label };
                });
                return res.json({ data, page, pageSize, total });
            }

            const all = readData('users.json').map(u => {
                const role = normalizeRole(u.role);
                const role_label = role === 'admin' ? 'Administrador' : role === 'employee' ? 'Empleado' : 'Cliente';
                return { id: u.id, username: u.username, role, role_label };
            });
        const total = all.length;
        const start = (page - 1) * pageSize;
        const data = all.slice(start, start + pageSize);
        return res.json({ data, page, pageSize, total });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// Crear usuario (solo Admin)
router.post('/', authorize(['admin']), async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const hashed = await bcrypt.hash(password, 10);

        if (USE_DB) {
            try {
                const dbRoleName = mapRoleToDbName(role);
                const roleId = await getRoleIdByName(dbRoleName);
                const result = await query(
                    'INSERT INTO usuarios (nombre, apellido, correo_electronico, contrasena, id_rol) VALUES (?, ?, ?, ?, ?)',
                    ['', '', username, hashed, roleId]
                );
                const id = String(result.insertId);
                return res.status(201).json({ message: 'User created', user: { id, username, role: normalizeRole(role) } });
            } catch (e) {
                if (e && (e.code === 'ER_DUP_ENTRY' || e.errno === 1062)) {
                    return res.status(409).json({ message: 'username already exists' });
                }
                console.error(e);
                return res.status(500).json({ message: 'server error' });
            }
        }

        const users = readData('users.json');
        if (users.find(u => u.username === username)) return res.status(409).json({ message: 'username already exists' });
        const newUser = { id: uuidv4(), username, password: hashed, role: normalizeRole(role) };
        users.push(newUser);
        writeData('users.json', users);
        return res.status(201).json({ message: 'User created', user: { id: newUser.id, username: newUser.username, role: newUser.role } });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// Actualizar usuario (solo Admin)
router.put('/:id', authorize(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, role } = req.body;
        if (USE_DB) {
            const updates = [];
            const params = [];
            if (username) { updates.push('correo_electronico = ?'); params.push(username); }
            if (password) { updates.push('contrasena = ?'); params.push(await bcrypt.hash(password, 10)); }
            if (role) { updates.push('id_rol = ?'); params.push(await getRoleIdByName(mapRoleToDbName(role))); }
            if (updates.length === 0) return res.json({ message: 'No changes' });
            params.push(id);
            const result = await query(`UPDATE usuarios SET ${updates.join(', ')} WHERE id_usuario = ?`, params);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
            return res.json({ message: 'User updated' });
        }
        const users = readData('users.json');
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1) return res.status(404).json({ message: 'User not found' });
        if (username) users[userIndex].username = username;
        if (password) users[userIndex].password = await bcrypt.hash(password, 10);
        if (role) users[userIndex].role = normalizeRole(role);
        writeData('users.json', users);
        return res.json({ message: 'User updated', user: { id: users[userIndex].id, username: users[userIndex].username, role: users[userIndex].role } });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

// Eliminar usuario (solo Admin)
router.delete('/:id', authorize(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        if (USE_DB) {
            const result = await query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
            return res.json({ message: 'User deleted' });
        }
        let users = readData('users.json');
        const initialLength = users.length;
        users = users.filter(u => u.id !== id);
        if (users.length === initialLength) return res.status(404).json({ message: 'User not found' });
        writeData('users.json', users);
        return res.json({ message: 'User deleted' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'server error' });
    }
});

module.exports = router;