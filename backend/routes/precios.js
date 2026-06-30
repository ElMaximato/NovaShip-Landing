const express = require('express');
const router  = express.Router();
const db      = require('../db');

// GET /api/precios — Obtener todos los precios
router.get('/', async (req, res) => {
  try {
    const [precios] = await db.execute(
      'SELECT * FROM precios ORDER BY id ASC'
    );
    res.json(precios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los precios.' });
  }
});

module.exports = router;