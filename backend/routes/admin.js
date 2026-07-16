const express     = require('express');
const router       = express.Router();
const db            = require('../db');
const bcrypt        = require('bcryptjs');
const jwt           = require('jsonwebtoken');
const verifyAdmin   = require('../middleware/verifyAdmin');
require('dotenv').config();

// POST /api/admin/login — Iniciar sesión de administrador
router.post('/login', async (req, res) => {
  const { password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ error: 'La contraseña es obligatoria.' });
    }

    const passwordValida = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);

    if (!passwordValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    const token = jwt.sign(
      { rol: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({ mensaje: 'Acceso concedido', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
});

function generarCodigo() {
  const numero = Math.floor(1000 + Math.random() * 9000);
  return `#RIU-${numero}`;
}

// POST /api/admin/reservas — Crear reserva manual (walk-in, desde el panel)
router.post('/reservas', verifyAdmin, async (req, res) => {
  const { nombre, telefono, fecha, hora, cancha } = req.body;

  try {
    if (!nombre || !telefono || !fecha || !hora || !cancha) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Verifica disponibilidad — misma regla que el formulario público
    const [ocupado] = await db.execute(
      `SELECT id FROM reservas 
       WHERE fecha = ? AND hora = ? AND cancha = ? 
       AND estado IN ('pendiente', 'confirmada')`,
      [fecha, hora, cancha]
    );

    if (ocupado.length > 0) {
      return res.status(409).json({ error: 'Esa cancha ya está reservada en ese horario.' });
    }

    // Genera código único
    let codigo;
    let intentos = 0;
    do {
      codigo = generarCodigo();
      const [existe] = await db.execute('SELECT id FROM reservas WHERE codigo = ?', [codigo]);
      if (existe.length === 0) break;
      intentos++;
    } while (intentos < 5);

    // Las reservas manuales entran directo como CONFIRMADA — el staff ya la validó en persona
    const [result] = await db.execute(
      'INSERT INTO reservas (codigo, nombre, telefono, fecha, hora, cancha, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [codigo, nombre, telefono, fecha, hora, cancha, 'confirmada']
    );

    res.status(201).json({
      mensaje: 'Reserva manual creada exitosamente',
      id: result.insertId,
      codigo,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la reserva manual.' });
  }
});

// GET /api/admin/reservas — Obtener todas las reservas (protegida)
router.get('/reservas', verifyAdmin, async (req, res) => {
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

// PATCH /api/admin/reservas/:id — Cambiar estado de una reserva (protegida)
router.patch('/reservas/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const estadosValidos = ['pendiente', 'confirmada', 'cancelada'];

  try {
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido.' });
    }

    const [result] = await db.execute(
      'UPDATE reservas SET estado = ? WHERE id = ?',
      [estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada.' });
    }

    res.json({ mensaje: 'Estado actualizado correctamente.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la reserva.' });
  }
});

// DELETE /api/admin/reservas/:id — Eliminar una reserva (protegida)
router.delete('/reservas/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute(
      'DELETE FROM reservas WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada.' });
    }

    res.json({ mensaje: 'Reserva eliminada correctamente.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la reserva.' });
  }
});

module.exports = router;