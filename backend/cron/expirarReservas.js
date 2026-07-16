const cron = require('node-cron');
const db   = require('../db');

function iniciarCronExpiracion() {
  // Corre cada 5 minutos
  cron.schedule('*/5 * * * *', async () => {
    try {
      const [result] = await db.execute(
        `UPDATE reservas 
         SET estado = 'expirada' 
         WHERE estado = 'pendiente' 
         AND created_at < (NOW() - INTERVAL 15 MINUTE)`
      );

      if (result.affectedRows > 0) {
        console.log(`⏰ ${result.affectedRows} reserva(s) marcada(s) como expirada(s).`);
      }
    } catch (error) {
      console.error('Error en cron de expiración:', error);
    }
  });

  console.log('🔄 Cron de expiración de reservas iniciado (cada 5 min).');
}

module.exports = iniciarCronExpiracion;