export function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Encabezado */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Aviso de privacidad</h1>
          <div className="h-1 w-12 bg-yellow-400 rounded-full mt-2" />
          <p className="text-xs text-gray-400 mt-3">Última actualización: mayo 2026</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

        {[
          {
            titulo: '1. Responsable del tratamiento de datos',
            texto: 'NovaShip S.A. de C.V., con domicilio en San Luis Rio Colorado, es responsable del uso y protección de sus datos personales. Para cualquier consulta relacionada con el tratamiento de su información, puede contactarnos en novaship_ayuda@gmail.com.',
          },
          {
            titulo: '2. Datos personales que recopilamos',
            texto: 'Recopilamos los siguientes datos personales: nombre completo, correo electrónico, número de teléfono, dirección de recolección y entrega, e información de pago. Estos datos son proporcionados directamente por el usuario al momento del registro o al crear un envío.',
          },
          {
            titulo: '3. Finalidad del tratamiento',
            texto: 'Los datos personales recopilados son utilizados para: crear y gestionar su cuenta de usuario, procesar y entregar sus envíos, emitir facturas y comprobantes, enviar notificaciones sobre el estado de sus paquetes, y mejorar nuestros servicios mediante análisis de uso.',
          },
          {
            titulo: '4. Transferencia de datos',
            texto: 'NovaShip no vende ni renta sus datos personales a terceros. Sin embargo, podrá compartir información necesaria con aliados logísticos y empresas de mensajería para completar la entrega de sus paquetes, quienes están obligados a mantener la confidencialidad de dicha información.',
          },
          {
            titulo: '5. Cookies y tecnologías de rastreo',
            texto: 'Nuestra plataforma utiliza cookies propias y de terceros para mejorar la experiencia de navegación, recordar preferencias del usuario y analizar el tráfico del sitio. El usuario puede configurar su navegador para rechazar cookies, aunque esto podría limitar algunas funcionalidades.',
          },
          {
            titulo: '6. Seguridad de los datos',
            texto: 'Implementamos medidas técnicas y organizativas para proteger sus datos personales contra accesos no autorizados, pérdida o alteración. La información de pago es procesada mediante protocolos de cifrado SSL y no es almacenada en nuestros servidores.',
          },
          {
            titulo: '7. Derechos ARCO',
            texto: 'Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, envíe una solicitud a novaship_ayuda@gmail.com indicando su nombre completo, correo registrado y el derecho que desea ejercer. Responderemos en un plazo máximo de 20 días hábiles.',
          },
          {
            titulo: '8. Retención de datos',
            texto: 'Sus datos personales serán conservados mientras mantenga una cuenta activa en NovaShip o mientras sean necesarios para los fines descritos en este aviso. Al solicitar la eliminación de su cuenta, procederemos a eliminar su información en un plazo de 30 días hábiles.',
          },
          {
            titulo: '9. Cambios al aviso de privacidad',
            texto: 'NovaShip se reserva el derecho de modificar el presente aviso en cualquier momento. Cualquier cambio será notificado mediante correo electrónico o mediante un aviso visible en la plataforma con al menos 10 días de anticipación.',
          },
        ].map(({ titulo, texto }) => (
          <div key={titulo} className="bg-white rounded-xl border border-gray-200 p-6 space-y-2">
            <h2 className="text-sm font-bold text-gray-900">{titulo}</h2>
            <p className="text-sm text-gray-500 leading-relaxed">{texto}</p>
          </div>
        ))}

        <p className="text-xs text-gray-400 text-center pb-4">
          ¿Tienes preguntas sobre tu privacidad? Escríbenos a{' '}
          <span className="text-[#0c1f4a] font-medium">novaship_ayuda@gmail.com</span>
        </p>

      </div>
    </div>
  );
}