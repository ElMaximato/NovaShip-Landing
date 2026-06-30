const express = require('express');
const router  = express.Router();
const db      = require('../db');

// POST /api/reservas — Crear una reserva
router.post('/', async (req, res) => {
  const { nombre, telefono, fecha, hora, cancha } = req.body;

  try {
    // Validaciones
    if (!nombre || !telefono || !fecha || !hora || !cancha) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    if (nombre.length < 10 || nombre.length > 60) {
      return res.status(400).json({ error: 'El nombre debe tener entre 10 y 60 caracteres.' });
    }
    if (telefono.length !== 10) {
      return res.status(400).json({ error: 'El teléfono debe tener exactamente 10 dígitos.' });
    }

    // Inserta en la BD
    const [result] = await db.execute(
      'INSERT INTO reservas (nombre, telefono, fecha, hora, cancha) VALUES (?, ?, ?, ?, ?)',
      [nombre, telefono, fecha, hora, cancha]
    );

    res.status(201).json({
      mensaje: 'Reserva creada exitosamente',
      id: result.insertId,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la reserva.' });
  }
});

// GET /api/reservas — Obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const [reservas] = await db.execute(
      'SELECT * FROM reservas ORDER BY created_at DESC'
    );
    res.json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las reservas.' });
  }
});

module.exports = router;