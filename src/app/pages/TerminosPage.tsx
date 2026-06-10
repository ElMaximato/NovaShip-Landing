export function TerminosPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Encabezado */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Términos y condiciones</h1>
          <div className="h-1 w-12 bg-yellow-400 rounded-full mt-2" />
          <p className="text-xs text-gray-400 mt-3">Última actualización: mayo 2026</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

        {[
          {
            titulo: '1. Aceptación de los términos',
            texto: 'Al acceder y utilizar los servicios de NovaShip, el usuario acepta de manera expresa los presentes términos y condiciones. Si no está de acuerdo con alguno de ellos, deberá abstenerse de utilizar la plataforma y los servicios ofrecidos.',
          },
          {
            titulo: '2. Descripción del servicio',
            texto: 'NovaShip es una plataforma de logística y paquetería que permite a los usuarios cotizar, crear y rastrear envíos nacionales e internacionales. Los servicios están disponibles para personas físicas mayores de 18 años con una cuenta registrada. Para más información, consulta nuestra <a href="/terminos" className="text-[#0c1f4a] font-semibold hover:underline">página de términos y condiciones</a>.',
          },
          {
            titulo: '3. Registro y cuenta de usuario',
            texto: 'Para acceder a ciertas funciones de la plataforma, el usuario deberá crear una cuenta proporcionando información veraz y actualizada. El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades realizadas bajo su cuenta.',
          },
          {
            titulo: '4. Tarifas y pagos',
            texto: 'Las tarifas de envío son calculadas en función del tipo de paquete, origen, destino y servicio seleccionado. Todos los precios incluyen IVA. NovaShip se reserva el derecho de modificar las tarifas en cualquier momento, notificando previamente a los usuarios registrados.',
          },
          {
            titulo: '5. Responsabilidad del remitente',
            texto: 'El usuario declara que el contenido del paquete es lícito, está correctamente embalado y cumple con las regulaciones vigentes. NovaShip no se hace responsable por daños derivados de un embalaje inadecuado o por el envío de mercancías prohibidas.',
          },
          {
            titulo: '6. Seguro y reclamaciones',
            texto: 'Todos los envíos incluyen un seguro básico. En caso de pérdida o daño, el usuario deberá notificarlo dentro de las 24 horas siguientes a la entrega. NovaShip evaluará cada caso y responderá en un plazo máximo de 5 días hábiles.',
          },
          {
            titulo: '7. Cancelaciones',
            texto: 'El usuario podrá cancelar un envío sin costo hasta 2 horas después de haberlo creado, siempre que el paquete no haya sido recolectado. Pasado ese tiempo, se aplicará una tarifa de cancelación equivalente al 20% del valor del envío.',
          },
          {
            titulo: '8. Modificaciones al servicio',
            texto: 'NovaShip se reserva el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento. Los cambios sustanciales serán comunicados con al menos 15 días de anticipación mediante correo electrónico.',
          },
          {
            titulo: '9. Legislación aplicable',
            texto: 'Los presentes términos se rigen por las leyes vigentes de los Estados Unidos Mexicanos. Cualquier controversia derivada del uso de la plataforma será resuelta ante los tribunales competentes de la Ciudad de México.',
          },
        ].map(({ titulo, texto }) => (
          <div key={titulo} className="bg-white rounded-xl border border-gray-200 p-6 space-y-2">
            <h2 className="text-sm font-bold text-gray-900">{titulo}</h2>
            <p className="text-sm text-gray-500 leading-relaxed">{texto}</p>
          </div>
        ))}

        <p className="text-xs text-gray-400 text-center pb-4">
          ¿Tienes dudas? Contáctanos en{' '}
          <span className="text-[#0c1f4a] font-medium">legal@novaship.mx</span>
        </p>

      </div>
    </div>
  );
}