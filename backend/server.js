const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const reservasRouter = require('./routes/reservas');
const authRouter     = require('./routes/auth');
const preciosRouter  = require('./routes/precios');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Rutas
app.use('/api/reservas', reservasRouter);
app.use('/api/auth',     authRouter);
app.use('/api/precios',  preciosRouter);

// Ruta de prueba
app.get('/api/ping', (req, res) => {
  res.json({ mensaje: 'Servidor Riú Padel funcionando ✅' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});