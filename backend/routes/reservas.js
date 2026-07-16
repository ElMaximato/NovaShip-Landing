const express = require('express');
const router  = express.Router();
const db      = require('../db');

// Rate limiting simple en memoria: máx 3 reservas por IP cada 15 min
const intentosPorIP = new Map();

function limiteExcedido(ip) {
  const ahora = Date.now();
  const registros = intentosPorIP.get(ip) || [];
  const recientes = registros.filter((t) => ahora - t < 15 * 60 * 1000);

  if (recientes.length >= 3) return true;

  recientes.push(ahora);
  intentosPorIP.set(ip, recientes);
  return false;
}

function generarCodigo() {
  const numero = Math.floor(1000 + Math.random() * 9000);
  return `#RIU-${numero}`;
}

// GET /api/reservas/disponibilidad?fecha=2026-07-15 — IMPORTANTE: va antes que otras rutas con params
router.get('/disponibilidad', async (req, res) => {
  const { fecha } = req.query;

  if (!fecha) {
    return res.status(400).json({ error: 'La fecha es obligatoria.' });
  }

  try {
    const [ocupadas] = await db.execute(
      `SELECT hora, cancha FROM reservas 
       WHERE fecha = ? AND estado IN ('pendiente', 'confirmada')`,
      [fecha]
    );
    res.json(ocupadas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar disponibilidad.' });
  }
});

// POST /api/reservas — Crear una reserva
router.post('/', async (req, res) => {
  const { nombre, telefono, fecha, hora, cancha, sitio_web } = req.body;
  const ip = req.ip;

  try {
    // Honeypot — si el campo trampa viene lleno, es un bot
    if (sitio_web) {
      return res.status(200).json({ mensaje: 'Reserva creada exitosamente' }); // respuesta falsa, no se guarda nada
    }

    // Rate limiting
    if (limiteExcedido(ip)) {
      return res.status(429).json({ error: 'Demasiados intentos. Espera unos minutos.' });
    }

    // Validaciones existentes
    if (!nombre || !telefono || !fecha || !hora || !cancha) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    if (nombre.length < 10 || nombre.length > 60) {
      return res.status(400).json({ error: 'El nombre debe tener entre 10 y 60 caracteres.' });
    }
    if (!/^\d{10}$/.test(telefono)) {
      return res.status(400).json({ error: 'El teléfono debe tener exactamente 10 dígitos.' });
    }

    // Fecha no puede ser pasada
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (new Date(fecha) < hoy) {
      return res.status(400).json({ error: 'La fecha no puede ser en el pasado.' });
    }

    // Verifica disponibilidad ANTES de gastar intentos generando código
    const [ocupado] = await db.execute(
      `SELECT id FROM reservas 
       WHERE fecha = ? AND hora = ? AND cancha = ? 
       AND estado IN ('pendiente', 'confirmada')`,
      [fecha, hora, cancha]
    );

    if (ocupado.length > 0) {
      return res.status(409).json({ error: 'Esa cancha ya está reservada en ese horario. Elige otro.' });
    }

    // Genera código único (reintenta si por rarísima casualidad choca)
    let codigo;
    let intentos = 0;
    do {
      codigo = generarCodigo();
      const [existe] = await db.execute('SELECT id FROM reservas WHERE codigo = ?', [codigo]);
      if (existe.length === 0) break;
      intentos++;
    } while (intentos < 5);

    const [result] = await db.execute(
      'INSERT INTO reservas (codigo, nombre, telefono, fecha, hora, cancha, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [codigo, nombre, telefono, fecha, hora, cancha, 'pendiente']
    );

    res.status(201).json({
      mensaje: 'Reserva creada exitosamente',
      id: result.insertId,
      codigo,
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