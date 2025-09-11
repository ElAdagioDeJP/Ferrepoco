const bcrypt = require('bcryptjs');
const { readData, writeData, uuidv4 } = require('../utils/dataHandler');
const { USE_DB, query } = require('../src/db');

async function run() {
  const username = process.argv[2];
  const password = process.argv[3];
  const roleArg = (process.argv[4] || 'employee').toLowerCase();
  const validRoles = ['admin', 'employee', 'client'];

  if (!username || !password) {
    console.log('Usage: node scripts/createUser.js <email> <password> [role=admin|employee|client]');
    process.exit(1);
  }
  if (!validRoles.includes(roleArg)) {
    console.error('Invalid role. Use one of:', validRoles.join(', '));
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 10);

  if (USE_DB) {
    const roleMap = { admin: 'Administrador', employee: 'Empleado', client: 'Cliente' };
    const dbRoleName = roleMap[roleArg] || 'Cliente';
    const rows = await query('SELECT id_rol FROM roles WHERE LOWER(nombre_rol) = LOWER(?) LIMIT 1', [dbRoleName]);
    const roleId = rows?.[0]?.id_rol || 3;
    try {
      await query('INSERT INTO usuarios (nombre, apellido, correo_electronico, contrasena, id_rol) VALUES (?, ?, ?, ?, ?)', ['', '', username, hashed, roleId]);
      console.log(`User created in DB: ${username} (role: ${dbRoleName})`);
      return;
    } catch (e) {
      if (e && (e.code === 'ER_DUP_ENTRY' || e.errno === 1062)) {
        console.log('User already exists:', username);
        return;
      }
      throw e;
    }
  }

  const users = readData('users.json');
  if (users.find(u => u.username === username)) { console.log('User already exists:', username); return; }
  const newUser = { id: uuidv4(), username, password: hashed, role: roleArg };
  users.push(newUser);
  writeData('users.json', users);
  console.log(`User created (JSON): ${username} (role: ${roleArg})`);
}

run().catch(err => { console.error(err); process.exit(1); });
