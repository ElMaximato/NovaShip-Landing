import { useState } from 'react';
import { Phone, Mail, MessageCircle, MapPin, Clock, ChevronDown } from 'lucide-react';

const faqs = [
  { pregunta: '¿Cuánto tarda en responder el equipo de soporte?',      respuesta: 'Respondemos correos en menos de 24 horas en días hábiles. Por teléfono y chat la atención es inmediata.' },
  { pregunta: '¿Puedo rastrear mi paquete sin tener cuenta?',           respuesta: 'Sí, solo necesitas tu número de guía en la sección de Rastreo, sin necesidad de iniciar sesión.' },
  { pregunta: '¿Qué hago si mi paquete no llegó en la fecha estimada?', respuesta: 'Contáctanos por teléfono o chat con tu número de guía y te daremos información actualizada del estado de tu envío.' },
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
        <p className="text-sm text-gray-500 leading-relaxed pb-4">{respuesta}</p>
      )}
    </div>
  );
}

export function ContactoPage() {
  const [enviado, setEnviado] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Encabezado */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Centro de contacto</h1>
          <div className="h-1 w-12 bg-yellow-400 rounded-full mt-2" />
          <p className="text-sm text-gray-500 mt-3">
            Estamos aquí para ayudarte. Elige el canal que prefieras.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">

        {/* Canales de contacto */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Phone,         titulo: 'Teléfono',            valor: '653 136 1234',          sub: 'Lun–Vie 9:00–18:00',        color: 'bg-yellow-100 text-yellow-600' },
            { icon: Mail,          titulo: 'Correo electrónico',  valor: 'novaship_ayuda@gmail.com', sub: 'Respuesta en menos de 24h', color: 'bg-blue-100 text-blue-600'   },
            { icon: MessageCircle, titulo: 'Chat en línea',       valor: 'Chat WhatsApp',         sub: 'Lun–Vie 9:00–18:00',        color: 'bg-green-100 text-green-600'  },
          ].map(({ icon: Icon, titulo, valor, sub, color }) => (
            <div
              key={titulo}
              className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center hover:border-yellow-300 hover:shadow-sm transition-all"
            >
              <div className={`${color} p-3 rounded-xl mb-3`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-xs text-gray-400 mb-1">{titulo}</p>
              <p className="text-sm font-bold text-gray-900">{valor}</p>
              <p className="text-xs text-gray-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Formulario + Info + Imagen */}
        <div className="grid lg:grid-cols-4 gap-6 items-start">

          {/* Info adicional */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h2 className="text-sm font-bold text-gray-900">Información de contacto</h2>
              <div className="space-y-3">
                {[
                  { icon: MapPin, texto: 'Av. Hidalgo y 22, San Luis Rio Colorado' },
                  { icon: Clock,  texto: 'Lunes a Viernes · 9:00 AM – 6:00 PM'    },
                  { icon: Mail,   texto: 'novaship_ayuda@gmail.com'                 },
                  { icon: Phone,  texto: '653 136 1234'                             },
                ].map(({ icon: Icon, texto }) => (
                  <div key={texto} className="flex items-start gap-3 text-sm text-gray-500">
                    <Icon className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                    <span>{texto}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ rápido */}
            <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
              <h2 className="text-sm font-bold text-gray-900 mb-2">Preguntas frecuentes</h2>
              {faqs.map((f, i) => (
                <FAQItem key={i} pregunta={f.pregunta} respuesta={f.respuesta} />
              ))}
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            {enviado ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-3">
                <div className="bg-green-100 p-4 rounded-full">
                  <MessageCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900">¡Mensaje enviado!</h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  Te responderemos a la brevedad en el correo que proporcionaste.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-gray-900 mb-2">Envíanos un mensaje</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700">Nombre <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Juan Pérez"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700">Correo electrónico <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      placeholder="juan@correo.com"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Número de guía <span className="text-gray-400">(opcional)</span></label>
                  <input
                    type="text"
                    placeholder="Ej: NS-2026-48291"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Motivo de contacto <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition bg-white">
                    <option value="">Selecciona una opción</option>
                    <option>Problema con un envío</option>
                    <option>Consulta sobre precios</option>
                    <option>Cancelación de envío</option>
                    <option>Reclamación por daño o pérdida</option>
                    <option>Información general</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Mensaje <span className="text-red-500">*</span></label>
                  <textarea
                    rows={4}
                    placeholder="Describe tu situación con el mayor detalle posible..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition resize-none"
                  />
                </div>

                <button
                  onClick={() => setEnviado(true)}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#0c1f4a] py-3 rounded-xl font-bold text-sm transition-colors"
                >
                  Enviar mensaje
                </button>
              </div>
            )}
          </div>

          {/* Imagen vertical */}
          <div className="hidden lg:block rounded-xl overflow-hidden h-full min-h-[500px]">
            <img
              src="/paquete_vertical.jpg"
              alt="NovaShip"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

        </div>
      </div>
    </div>
  );
}