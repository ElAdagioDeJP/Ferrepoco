const express = require('express');
const router = express.Router();
const { readData, writeData, uuidv4 } = require('../utils/dataHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authenticate } = require('../src/middleware/auth');
const { USE_DB, query } = require('../src/db');
<<<<<<< HEAD

const JWT_SECRET = process.env.JWT_SECRET || 'ferrepoco_super_secret_key';

<<<<<<< HEAD
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
=======
=======
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'ferrepoco_super_secret_key';

>>>>>>> unificado
function normalizeRole(dbRole) {
    if (!dbRole) return 'client';
    const r = String(dbRole).toLowerCase();
    if (r.startsWith('admin')) return 'admin';
    if (r.startsWith('emple')) return 'employee';
    if (r.startsWith('client') || r.startsWith('clien')) return 'client';
    return r;
}

// Map API role value to DB display name
function mapRoleToDbName(role) {
    const r = normalizeRole(role);
    if (r === 'admin') return 'Administrador';
    if (r === 'employee') return 'Empleado';
    return 'Cliente';
}

async function getRoleIdByName(dbRoleName) {
    try {
        const rows = await query('SELECT id_rol FROM roles WHERE LOWER(nombre_rol) = LOWER(?) LIMIT 1', [dbRoleName]);
        const id = rows?.[0]?.id_rol;
        if (id) return id;
    } catch (err) {
        console.warn('getRoleIdByName failed, using default role id. Reason:', err?.message);
    }
    // Fallback to conventional id for Cliente
    return 3;
}

// Register new user (client only from public endpoint)
router.post('/register', async (req, res) => {
    try {
        const { username, password, nombre = '', apellido = '', role } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'username and password required' });
        const hashed = await bcrypt.hash(password, 10);
            if (USE_DB) {
                // Force/normalize role (public registration -> client)
                const normalized = normalizeRole(role) || 'client';
                const dbRoleName = mapRoleToDbName(normalized);
                const roleId = await getRoleIdByName(dbRoleName);
                try {
                    const rows = await query(
                        'INSERT INTO usuarios (nombre, apellido, correo_electronico, contrasena, id_rol) VALUES (?, ?, ?, ?, ?)',
                        [nombre, apellido, username, hashed, roleId]
                    );
                    const id = rows.insertId?.toString() || uuidv4();
                    return res.status(201).json({ message: 'registered', user: { id, username, role: normalized, nombre, apellido } });
                } catch (e) {
                    // Duplicate email
                    if (e && (e.code === 'ER_DUP_ENTRY' || e.errno === 1062)) {
                        return res.status(409).json({ message: 'username already exists' });
                    }
                    console.error(e);
                    return res.status(500).json({ message: 'server error' });
                }
        } else {
            const users = readData('users.json');
            if (users.find(u => u.username === username)) return res.status(409).json({ message: 'username already exists' });
            const user = { id: uuidv4(), username, password: hashed, role: 'client', nombre, apellido };
            users.push(user);
            writeData('users.json', users);
            return res.status(201).json({ message: 'registered', user: { id: user.id, username, role: 'client', nombre, apellido } });
<<<<<<< HEAD
>>>>>>> unificado
=======
>>>>>>> unificado
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
<<<<<<< HEAD
<<<<<<< HEAD
            const rows = await query('SELECT u.id_usuario as id, u.correo_electronico as username, u.contrasena as password, r.nombre_rol as role FROM usuarios u LEFT JOIN roles r ON u.id_rol = r.id_rol WHERE u.correo_electronico = ? LIMIT 1', [username]);
            userRecord = rows[0];
=======
=======
>>>>>>> unificado
            const rows = await query('SELECT u.id_usuario as id, u.nombre, u.apellido, u.correo_electronico as username, u.contrasena as password, u.imagen_url as imagen_url, r.nombre_rol as role FROM usuarios u LEFT JOIN roles r ON u.id_rol = r.id_rol WHERE u.correo_electronico = ? LIMIT 1', [username]);
            userRecord = rows[0];
            if (!userRecord) return res.status(401).json({ message: 'Invalid credentials' });
            const ok = await bcrypt.compare(password, userRecord.password);
            if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
            userRecord.role = normalizeRole(userRecord.role);
<<<<<<< HEAD
>>>>>>> unificado
=======
>>>>>>> unificado
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

<<<<<<< HEAD
<<<<<<< HEAD
        const token = jwt.sign({ id: String(userRecord.id), username: userRecord.username, role: userRecord.role }, JWT_SECRET, { expiresIn: '8h' });
        return res.json({ message: 'Login successful', user: { id: String(userRecord.id), username: userRecord.username, role: userRecord.role, token } });
=======
=======
>>>>>>> unificado
    const token = jwt.sign({ id: String(userRecord.id), username: userRecord.username, role: userRecord.role }, JWT_SECRET, { expiresIn: '8h' });
    // Normalize avatar URL: when using DB, imagen_url may be stored as '/uploads/...'. Also expose via '/api' prefix for proxy.
    let imagen_url = null;
    if (userRecord.imagen_url) {
        const raw = String(userRecord.imagen_url);
        imagen_url = raw.startsWith('/api/') ? raw : `/api${raw.startsWith('/') ? '' : '/'}${raw}`;
    }
    return res.json({ message: 'Login successful', user: { id: String(userRecord.id), username: userRecord.username, role: userRecord.role, token, nombre: userRecord.nombre, apellido: userRecord.apellido, imagen_url } });
<<<<<<< HEAD
>>>>>>> unificado
=======
>>>>>>> unificado
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
});

// Profile
router.get('/me', authenticate, (req, res) => {
    return res.json({ user: req.user });
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;

// ---------------------- Password Recovery ----------------------
// Nota: Se añade al final del archivo para minimizar conflictos.
// Rutas: POST /api/auth/forgot-password y POST /api/auth/reset-password

/**
 * Genera un token seguro en base64 URL-safe
 */
function generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
}

async function ensurePasswordResetTable() {
    if (!USE_DB) return;
    try {
        await query(`CREATE TABLE IF NOT EXISTS password_resets (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            token VARCHAR(128) NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            INDEX (token),
            INDEX (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
    } catch (e) {
        console.error('Failed ensuring password_resets table:', e.message);
    }
}

// Persistencia en modo FILE: reutilizamos readData/writeData
function readResetsFile() {
    try { return readData('password_resets.json'); } catch { return []; }
}
function writeResetsFile(arr) {
    try { writeData('password_resets.json', arr); } catch { /* ignore */ }
}

// Solicitar recuperación (si el correo existe, genera token y responde genérico)
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body || {};
    const correo = (email || '').trim();
    if (!correo) return res.status(400).json({ message: 'email required' });
    const genericMsg = 'Si el correo existe, se han enviado instrucciones';
    try {
        const token = generateResetToken();
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hora
        if (USE_DB) {
            await ensurePasswordResetTable();
            // Verificar que el usuario exista (no revelar si no)
            let userRows = [];
            try {
                userRows = await query('SELECT id_usuario FROM usuarios WHERE correo_electronico = ? LIMIT 1', [correo]);
            } catch (e) {
                // ignorar
            }
            if (userRows.length) {
                await query('INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)', [correo, token, expiresAt]);
            }
        } else {
            const resets = readResetsFile();
            // Limpiar expirados
            const now = Date.now();
            const filtered = resets.filter(r => new Date(r.expiresAt).getTime() > now && r.email !== correo);
            // Verificar que el usuario exista en archivo users.json
            const users = readData('users.json');
            if (users.find(u => (u.username || '').toLowerCase() === correo.toLowerCase() || (u.correo_electronico || '').toLowerCase() === correo.toLowerCase())) {
                filtered.push({ id: uuidv4(), email: correo, token, expiresAt: expiresAt.toISOString() });
            }
            writeResetsFile(filtered);
        }
        // Simulación de envío de correo: log en servidor
        console.log(`[PasswordReset] Token generado para ${correo}: ${token}`);
        return res.json({ message: genericMsg });
    } catch (e) {
        console.error('forgot-password error:', e.message);
        return res.json({ message: genericMsg }); // Siempre genérico
    }
});

// Resetear contraseña usando token
router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body || {};
    if (!token || !password) return res.status(400).json({ message: 'token and password required' });
    try {
        const now = new Date();
        let email = null;
        if (USE_DB) {
            await ensurePasswordResetTable();
            const rows = await query('SELECT email, expires_at FROM password_resets WHERE token = ? LIMIT 1', [token]);
            if (!rows.length) return res.status(400).json({ message: 'Invalid token' });
            const row = rows[0];
            if (new Date(row.expires_at) < now) return res.status(400).json({ message: 'Expired token' });
            email = row.email;
            // Actualizar contraseña
            const hashed = await bcrypt.hash(password, 10);
            await query('UPDATE usuarios SET contrasena = ? WHERE correo_electronico = ? LIMIT 1', [hashed, email]);
            // Borrar token usado
            await query('DELETE FROM password_resets WHERE token = ? LIMIT 1', [token]);
        } else {
            const resets = readResetsFile();
            const entry = resets.find(r => r.token === token);
            if (!entry) return res.status(400).json({ message: 'Invalid token' });
            if (new Date(entry.expiresAt) < now) return res.status(400).json({ message: 'Expired token' });
            email = entry.email;
            const users = readData('users.json');
            const idx = users.findIndex(u => (u.username || u.correo_electronico) === email);
            if (idx === -1) return res.status(400).json({ message: 'Invalid token' });
            const hashed = await bcrypt.hash(password, 10);
            users[idx].password = hashed;
            writeData('users.json', users);
            // eliminar token
            const remaining = resets.filter(r => r.token !== token);
            writeResetsFile(remaining);
        }
        return res.json({ message: 'Password updated' });
    } catch (e) {
        console.error('reset-password error:', e.message);
        return res.status(500).json({ message: 'server error' });
    }
});
>>>>>>> unificado
