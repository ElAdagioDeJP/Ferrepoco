const path = require('path');
const bcrypt = require('bcryptjs');
const { readData, writeData, uuidv4 } = require('../utils/dataHandler');

async function run() {
	const username = process.argv[2] || 'admin@ferrepoco.com';
	const password = process.argv[3] || 'password';
	const users = readData('users.json');
	if (users.find(u => u.username === username)) {
		console.log('User already exists:', username);
		return;
	}
	const hashed = await bcrypt.hash(password, 10);
	users.push({ id: uuidv4(), username, password: hashed, role: 'admin' });
	writeData('users.json', users);
	console.log('Admin created:', username);
}

run().catch(err => { console.error(err); process.exit(1); });
