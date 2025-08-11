const bcrypt = require('bcryptjs');
const { readData, writeData, uuidv4 } = require('../utils/dataHandler');

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

  const users = readData('users.json');
  if (users.find(u => u.username === username)) {
    console.log('User already exists:', username);
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), username, password: hashed, role: roleArg };
  users.push(newUser);
  writeData('users.json', users);
  console.log(`User created: ${username} (role: ${roleArg})`);
}

run().catch(err => { console.error(err); process.exit(1); });
