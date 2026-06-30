const express  = require('express');
const router   = express.Router();
const db       = require('../db');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
require('dotenv').config();

// POST /api/auth/registro — Crear cuenta
router.post('/registro', async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  try {
    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Verifica si el email ya existe
    const [existe] = await db.execute(
      'SELECT id FROM usuarios WHERE email = ?', [email]
    );
    if (existe.length > 0) {
      return res.status(400).json({ error: 'Este correo ya está registrado.' });
    }

    // Encripta la contraseña
    const hash = await bcrypt.hash(password, 10);

    // Inserta el usuario
    const [result] = await db.execute(
      'INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)',
      [nombre, apellido, email, hash]
    );

    res.status(201).json({
      mensaje: 'Cuenta creada exitosamente',
      id: result.insertId,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la cuenta.' });
  }
});

// POST /api/auth/login — Iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
    }

    // Busca el usuario
    const [usuarios] = await db.execute(
      'SELECT * FROM usuarios WHERE email = ?', [email]
    );
    if (usuarios.length === 0) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
    }

    const usuario = usuarios[0];

    // Verifica la contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
    }

    // Genera el token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id:       usuario.id,
        nombre:   usuario.nombre,
        apellido: usuario.apellido,
        email:    usuario.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
});

module.exports = router;