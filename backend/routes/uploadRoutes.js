const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authenticate, authorize } = require('../src/middleware/auth');
const { USE_DB, query } = require('../src/db');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const base = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(base)) fs.mkdirSync(base, { recursive: true });
    const dir = path.join(base, 'products');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const safe = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, safe);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (req, file, cb) => {
    const allowed = ['.png', '.jpg', '.jpeg', '.webp'];
    const ext = path.extname(file.originalname || '').toLowerCase();
    if (!allowed.includes(ext)) return cb(new Error('Formato de imagen no soportado'));
    cb(null, true);
  }
});

// Helper: ensure category exists
async function ensureCategory(categoryName) {
  if (!USE_DB) return null;
  if (!categoryName) return null;
  const name = String(categoryName).trim();
  if (!name) return null;
  const found = await query('SELECT id_categoria FROM categorias WHERE LOWER(nombre_categoria) = LOWER(?) LIMIT 1', [name]);
  if (found?.length) return found[0].id_categoria;
  const ins = await query('INSERT INTO categorias (nombre_categoria) VALUES (?)', [name]);
  return ins.insertId;
}

async function getExistingCategoryIdByName(categoryName) {
  if (!USE_DB) return null;
  if (!categoryName) return null;
  const name = String(categoryName).trim();
  if (!name) return null;
  const found = await query('SELECT id_categoria FROM categorias WHERE LOWER(nombre_categoria) = LOWER(?) LIMIT 1', [name]);
  return found?.length ? found[0].id_categoria : null;
}

// POST /api/uploads/product
// Allow clients to create a product with one or multiple images
router.post('/product', authenticate, authorize(['client', 'admin', 'employee']), upload.array('images', 10), async (req, res) => {
  try {
    if (!USE_DB) return res.status(503).json({ message: 'DB not enabled' });

    const { name, description = '', price, category, categoryId, stock = 0 } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const priceNum = Number(price);
    const stockNum = Number(stock || 0);
    if (Number.isNaN(priceNum)) return res.status(400).json({ message: 'Precio inválido' });
    if (Number.isNaN(stockNum) || stockNum < 0) return res.status(400).json({ message: 'Stock inválido' });

    // Determine category id: prefer explicit categoryId; otherwise by name
    let catId = null;
    if (categoryId !== undefined && categoryId !== null && String(categoryId).trim() !== '') {
      const idNum = Number(categoryId);
      if (!Number.isInteger(idNum)) return res.status(400).json({ message: 'Categoría inválida' });
      const exists = await query('SELECT 1 FROM categorias WHERE id_categoria = ? LIMIT 1', [idNum]);
      if (!exists?.length) return res.status(400).json({ message: 'Categoría no encontrada' });
      catId = idNum;
    } else if (category !== undefined) {
      if (req.user?.role === 'client') {
        // Clients cannot create categories; must use existing by name
        const existingId = await getExistingCategoryIdByName(category);
        if (!existingId) return res.status(400).json({ message: 'Categoría no válida' });
        catId = existingId;
      } else {
        // Admin/employee can create missing categories from name
        catId = await ensureCategory(category);
      }
    }

    if (catId === null) return res.status(400).json({ message: 'Categoría requerida' });

    const ins = await query(
      'INSERT INTO productos (nombre_producto, descripcion, precio, id_categoria) VALUES (?, ?, ?, ?)',
      [name, description, priceNum, catId]
    );
    const productId = ins.insertId;

    // inventory upsert
    await query('INSERT INTO inventario (id_producto, stock) VALUES (?, ?) ON DUPLICATE KEY UPDATE stock = VALUES(stock)', [productId, stockNum]);

    // Save images
    const files = req.files || [];
    const baseUrl = req.protocol + '://' + req.get('host');
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const rel = '/uploads/products/' + path.basename(f.path);
      const full = baseUrl + rel;
      await query('INSERT INTO imagenes_producto (id_producto, url_imagen, posicion) VALUES (?, ?, ?)', [productId, rel, i + 1]);
      urls.push(full);
    }

    // Return created product
    const rows = await query(`
      SELECT p.id_producto, p.nombre_producto, p.descripcion, p.precio,
             i.stock, c.nombre_categoria AS categoria
      FROM productos p
      LEFT JOIN inventario i ON i.id_producto = p.id_producto
      LEFT JOIN categorias c ON c.id_categoria = p.id_categoria
      WHERE p.id_producto = ?
      LIMIT 1
    `, [productId]);

    return res.status(201).json({
      message: 'Producto creado',
      product: {
        id: String(rows[0].id_producto),
        name: rows[0].nombre_producto,
        description: rows[0].descripcion,
        price: Number(rows[0].precio),
        stock: Number(rows[0].stock || 0),
        category: rows[0].categoria || null,
        images: urls
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
});

module.exports = router;
