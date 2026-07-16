const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado. Token faltante.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (payload.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado.' });
    }

    req.admin = payload;
    next();

  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado.' });
  }
}

module.exports = verifyAdmin;