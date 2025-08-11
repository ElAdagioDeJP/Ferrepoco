const mysql = require('mysql2/promise');
require('dotenv').config();

const USE_DB = String(process.env.USE_DB || 'false').toLowerCase() === 'true';

let pool = null;

async function initPool() {
  if (!USE_DB || pool) return pool;
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  return pool;
}

async function query(sql, params) {
  if (!USE_DB) throw new Error('Database disabled. Enable by setting USE_DB=true');
  const p = await initPool();
  const [rows] = await p.execute(sql, params);
  return rows;
}

module.exports = { USE_DB, initPool, query };
