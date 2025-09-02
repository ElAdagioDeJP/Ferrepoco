const express = require('express');
const router = express.Router();
const { USE_DB, query, initPool } = require('../src/db');
const { authorize } = require('../src/middleware/auth');
const { readData, writeData } = require('../utils/dataHandler');

// Client: get available payment methods
router.get('/methods', authorize(['client']), async (req, res) => {
  try {
    const defaults = [
      { id_metodo: 1, nombre_metodo: 'Efectivo' },
      { id_metodo: 2, nombre_metodo: 'Tarjeta de crédito' },
      { id_metodo: 3, nombre_metodo: 'Transferencia bancaria' }
    ];
    if (USE_DB) {
      try {
        const rows = await query('SELECT * FROM metodos_pago ORDER BY id_metodo ASC');
        return res.json(rows);
      } catch (dbErr) {
        console.error('DB error fetching metodos_pago, returning defaults:', dbErr.message || dbErr);
        return res.json(defaults);
      }
    }
    return res.json(defaults);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
});

// Client: register a payment for an order
router.post('/', authorize(['client']), async (req, res) => {
  try {
    const { orderId, methodId, amount } = req.body || {};
    if (!orderId || !methodId || amount == null) {
      return res.status(400).json({ message: 'orderId, methodId and amount are required' });
    }

    if (USE_DB) {
      const pool = await initPool();
      const conn = await pool.getConnection();
      try {
        await conn.beginTransaction();
        // Validate order
        const [orders] = await conn.query('SELECT * FROM pedidos WHERE id_pedido = ? FOR UPDATE', [Number(orderId)]);
        if (!orders.length) { await conn.rollback(); conn.release(); return res.status(404).json({ message: 'Order not found' }); }
        const order = orders[0];
        // Ensure not already paid
        const [pRows] = await conn.query('SELECT * FROM pagos WHERE id_pedido = ? LIMIT 1', [Number(orderId)]);
        if (pRows.length) { await conn.rollback(); conn.release(); return res.status(400).json({ message: 'Order already paid' }); }
        // Amount match (allow small epsilon)
        const expected = Number(order.total_pedido);
        if (Math.abs(Number(amount) - expected) > 0.01) { await conn.rollback(); conn.release(); return res.status(400).json({ message: 'Amount mismatch' }); }
        // Insert payment
        await conn.query('INSERT INTO pagos (id_pedido, id_metodo, monto_pagado) VALUES (?, ?, ?)', [Number(orderId), Number(methodId), expected]);
        // Update order status to Completado
        await conn.query('UPDATE pedidos SET estado_pedido = ? WHERE id_pedido = ?', ['Completado', Number(orderId)]);
        await conn.commit();
        conn.release();
        return res.status(201).json({ message: 'Payment recorded', payment: { orderId: String(orderId), methodId: String(methodId), amount: expected } });
      } catch (err) {
        try { await conn.rollback(); } catch (rbErr) { console.error('Rollback failed:', rbErr); }
        conn.release();
        console.error(err);
        return res.status(500).json({ message: 'server error' });
      }
    }

    // JSON fallback: append to payments.json
    const payments = readData('payments.json');
    // naive: push payment; no order validation available in JSON path here
    payments.push({ orderId, methodId, amount: Number(amount), date: new Date().toISOString() });
    writeData('payments.json', payments);
    return res.status(201).json({ message: 'Payment recorded', payment: { orderId, methodId, amount: Number(amount) } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
});

module.exports = router;
