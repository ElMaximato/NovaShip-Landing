import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, MessageCircle, Phone, Mail } from 'lucide-react';

const faqs = [
  {
    pregunta: '¿Cómo puedo rastrear mi paquete?',
    respuesta: 'Ve a la sección "Rastreo" en el menú principal e ingresa tu número de guía.',
  },
  {
    pregunta: '¿Cuánto tiempo tarda un envío nacional?',
    respuesta: '2 - 3 días hábiles, aunque puede tardar mas por razones climatologicas',
  },
  {
    pregunta: '¿Puedo cambiar la dirección de entrega después de enviar el paquete?',
    respuesta: 'Es posible realizar cambios antes de que el paquete salga del centro de distribución. Contáctanos lo antes posible al 653 136 1234.',
  },
  {
    pregunta: '¿Qué hago si mi paquete llega dañado?',
    respuesta: 'Todos los envíos incluyen seguro básico. Toma fotos del daño y contáctanos dentro de las 24 horas siguientes a la entrega para iniciar el proceso de reclamación.',
  },
  {
    pregunta: '¿Cómo se calcula el precio de un envío?',
    respuesta: 'El precio depende del tipo de paquete (tamaño y peso), la distancia entre origen y destino, y el servicio seleccionado. Usa nuestro cotizador para obtener un precio exacto.',
  },
  {
    pregunta: '¿Puedo cancelar un envío?',
    respuesta: 'Puedes cancelar sin costo hasta 2 horas después de crearlo, siempre que el paquete no haya sido recolectado. Contáctanos por teléfono o correo.',
  },
  {
    pregunta: '¿Hacen recolección a domicilio?',
    respuesta: 'Sí, ofrecemos recolección a domicilio en la mayoría de las ciudades. Al crear tu envío puedes programar el día y horario de recolección.',
  },
  {
    pregunta: '¿Es seguro enviar documentos importantes?',
    respuesta: 'Sí. Contamos con un servicio especial para documentos con embalaje certificado, manejo prioritario y seguro incluido.',
  },
];

function FAQItem({ pregunta, respuesta }: { pregunta: string; respuesta: string }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-full flex items-center justify-between py-4 text-left gap-4"
      >
        <span className="text-sm font-semibold text-gray-800">{pregunta}</span>
        <ChevronDown className={`h-4 w-4 text-gray-400 shrink-0 transition-transform duration-200 ${abierto ? 'rotate-180' : ''}`} />
      </button>
      {abierto && (
        <p className="text-sm text-gray-500 leading-relaxed pb-4">
          {respuesta}
        </p>
      )}
    </div>
  );
}

export function AyudaPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Encabezado */}
<div className="bg-white border-b border-gray-200 px-6 py-8">
  <div className="max-w-3xl mx-auto flex items-center justify-between gap-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Centro de ayuda</h1>
      <div className="h-1 w-12 bg-yellow-400 rounded-full mt-2" />
      <p className="text-sm text-gray-500 mt-3">
        Encuentra respuestas a las preguntas más frecuentes.
      </p>
    </div>
    <div className="hidden md:block w-48 h-32 rounded-xl overflow-hidden shrink-0 relative">
      <img
        src="/entrega.jpg"
        alt="NovaShip entrega"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-8xl font-black text-white/20 select-none leading-none">
          ?
        </span>
      </div>
    </div>
  </div>
</div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">

        {/* FAQ Acordeón */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide py-4 border-b border-gray-200">
            Preguntas frecuentes
          </h2>
          {faqs.map((faq, i) => (
            <FAQItem key={i} pregunta={faq.pregunta} respuesta={faq.respuesta} />
          ))}
        </div>

        {/* Canales de contacto */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">
            ¿No encontraste tu respuesta? Contáctanos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Phone,         label: 'Teléfono',   valor: '653 136 1234',          sub: 'Lun–Vie 9:00–18:00' },
              { icon: Mail,          label: 'Correo',     valor: 'novaship_ayuda@gmail.com',      sub: 'Respuesta en 24h'   },
              { icon: MessageCircle, label: 'Chat',       valor: 'Chat Whatsapp',          sub: 'Respuesta en 24h'   },
            ].map(({ icon: Icon, label, valor, sub }) => (
              <div key={label} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="bg-yellow-100 p-3 rounded-xl mb-3">
                  <Icon className="h-5 w-5 text-yellow-600" />
                </div>
                <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-gray-800">{valor}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA cuenta */}
        <div className="bg-[#0c1f4a] rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-sm mb-1">¿Primera vez con NovaShip?</p>
            <p className="text-white/60 text-xs">Crea tu cuenta gratis y gestiona todos tus envíos en un solo lugar.</p>
          </div>
          <Link
            to="/registro"
            className="shrink-0 bg-yellow-400 hover:bg-yellow-300 text-[#0c1f4a] px-5 py-2.5 rounded-lg font-bold text-sm transition-colors"
          >
            Crear cuenta
          </Link>
        </div>

      </div>
    </div>
  );
}