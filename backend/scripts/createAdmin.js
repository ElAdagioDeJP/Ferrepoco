const path = require('path');
const bcrypt = require('bcryptjs');
const { readData, writeData, uuidv4 } = require('../utils/dataHandler');
<<<<<<< HEAD
=======
const { USE_DB, query } = require('../src/db');
>>>>>>> unificado

async function run() {
	const username = process.argv[2] || 'admin@ferrepoco.com';
	const password = process.argv[3] || 'password';
<<<<<<< HEAD
=======
	const hashed = await bcrypt.hash(password, 10);

	if (USE_DB) {
		// Ensure role exists and get id
		const roleName = 'Administrador';
		const rows = await query('SELECT id_rol FROM roles WHERE LOWER(nombre_rol) = LOWER(?) LIMIT 1', [roleName]);
		const roleId = rows?.[0]?.id_rol || 1;
		try {
			await query(
				'INSERT INTO usuarios (nombre, apellido, correo_electronico, contrasena, id_rol) VALUES (?, ?, ?, ?, ?)',
				['Admin', 'Root', username, hashed, roleId]
			);
			console.log('Admin created in DB:', username);
			return;
		} catch (e) {
			if (e && (e.code === 'ER_DUP_ENTRY' || e.errno === 1062)) {
				console.log('User already exists:', username);
				return;
			}
			throw e;
		}
	}

>>>>>>> unificado
	const users = readData('users.json');
	if (users.find(u => u.username === username)) {
		console.log('User already exists:', username);
		return;
	}
<<<<<<< HEAD
	const hashed = await bcrypt.hash(password, 10);
	users.push({ id: uuidv4(), username, password: hashed, role: 'admin' });
	writeData('users.json', users);
	console.log('Admin created:', username);
=======
	users.push({ id: uuidv4(), username, password: hashed, role: 'admin' });
	writeData('users.json', users);
	console.log('Admin created (JSON):', username);
>>>>>>> unificado
}

run().catch(err => { console.error(err); process.exit(1); });
