const express = require('express');
const router = express.Router();
const { USE_DB, query } = require('../src/db');
const { readData } = require('../utils/dataHandler');
const { authorize } = require('../src/middleware/auth');

// Helper to fetch from DB or fallback JSON if applicable
async function fetchAll(table, jsonFile) {
  if (USE_DB) {
    return await query(`SELECT * FROM ${table}`);
  }
  if (jsonFile) return readData(jsonFile);
  return [];
}

// Public read endpoints (restrict admin/employee where sensible)
router.get('/roles', authorize(['admin']), async (req, res) => {
  try {
    const rows = await fetchAll('roles');
    res.json(rows);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/usuarios', authorize(['admin']), async (req, res) => {
  try {
    if (USE_DB) {
      const rows = await query('SELECT u.*, r.nombre_rol AS role FROM usuarios u LEFT JOIN roles r ON u.id_rol = r.id_rol');
      return res.json(rows);
    }
    const rows = readData('users.json');
    res.json(rows);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/categorias', async (req, res) => {
  try {
    const rows = await fetchAll('categorias');
    res.json(rows);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/productos', async (req, res) => {
  try {
    const rows = await fetchAll('productos', 'products.json');
    res.json(rows);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Productos con stock (join inventario)
router.get('/productos_full', async (req, res) => {
  try {
    if (USE_DB) {
      const rows = await query(`
        SELECT p.*, i.stock, c.nombre_categoria AS categoria
        FROM productos p
        LEFT JOIN inventario i ON i.id_producto = p.id_producto
        LEFT JOIN categorias c ON c.id_categoria = p.id_categoria
      `);
      return res.json(rows);
    }
    // JSON fallback only has products with stock in products.json
    const rows = readData('products.json');
    res.json(rows);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/inventario', authorize(['admin','employee']), async (req, res) => {
  try {
    const rows = await fetchAll('inventario');
    res.json(rows);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/alertas_stock', authorize(['admin','employee']), async (req, res) => {
  try {
    const rows = await fetchAll('alertas_stock');
    res.json(rows);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/pedidos', authorize(['admin','employee']), async (req, res) => {
  try {
    const rows = await fetchAll('pedidos', 'orders.json');
    res.json(rows);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/detalle_pedido', authorize(['admin','employee']), async (req, res) => {
  try {
    const rows = await fetchAll('detalle_pedido');
    res.json(rows);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/metodos_pago', authorize(['admin','employee']), async (req, res) => {
  try {
    const rows = await fetchAll('metodos_pago');
    res.json(rows);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/pagos', authorize(['admin','employee']), async (req, res) => {
  try {
    const rows = await fetchAll('pagos');
    res.json(rows);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/busquedas_clientes', authorize(['admin','employee']), async (req, res) => {
  try {
    const rows = await fetchAll('busquedas_clientes');
    res.json(rows);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// Aggregate all tables for quick inspection
router.get('/all', authorize(['admin','employee']), async (req, res) => {
  try {
    if (USE_DB) {
      const [roles, usuarios, categorias, productos, inventario, alertas_stock, pedidos, detalle_pedido, metodos_pago, pagos, busquedas_clientes] = await Promise.all([
        query('SELECT * FROM roles'),
        query('SELECT * FROM usuarios'),
        query('SELECT * FROM categorias'),
        query('SELECT * FROM productos'),
        query('SELECT * FROM inventario'),
        query('SELECT * FROM alertas_stock'),
        query('SELECT * FROM pedidos'),
        query('SELECT * FROM detalle_pedido'),
        query('SELECT * FROM metodos_pago'),
        query('SELECT * FROM pagos'),
        query('SELECT * FROM busquedas_clientes'),
      ]);
      return res.json({ roles, usuarios, categorias, productos, inventario, alertas_stock, pedidos, detalle_pedido, metodos_pago, pagos, busquedas_clientes });
    }
    // Fallback to JSON where available
    return res.json({
      roles: [],
      usuarios: readData('users.json'),
      categorias: [],
      productos: readData('products.json'),
      inventario: [],
      alertas_stock: [],
      pedidos: readData('orders.json'),
      detalle_pedido: [],
      metodos_pago: [],
      pagos: [],
      busquedas_clientes: []
    });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
