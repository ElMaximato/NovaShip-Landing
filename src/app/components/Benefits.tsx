import { Link } from 'react-router-dom';
import { Clock, MapPin, Shield, Headphones, History, CreditCard, Bell, Home, Calculator, Truck } from 'lucide-react';

const benefitsList = [
  { icon: Clock,       title: 'Entrega puntual',        description: 'Cumplimos con los tiempos prometidos en cada envío.' },
  { icon: MapPin,      title: 'Rastreo en tiempo real', description: 'Sigue tu paquete minuto a minuto desde cualquier dispositivo.' },
  { icon: Shield,      title: 'Seguridad garantizada',  description: 'Todos los envíos incluyen seguro básico sin costo adicional.' },
  { icon: Headphones,  title: 'Atención 24/7',          description: 'Soporte disponible las 24 horas para resolver tus dudas.' },
];

const cuentaBeneficios = [
  { icon: History,     title: 'Historial de envíos',    description: 'Consulta todos tus envíos anteriores y descarga tus guías cuando quieras.' },
  { icon: CreditCard,  title: 'Pagos más rápidos',      description: 'Guarda tus métodos de pago y completa tus envíos en segundos.' },
  { icon: Bell,        title: 'Alertas en tiempo real', description: 'Recibe notificaciones del estado de tu paquete en cada etapa del trayecto.' },
  { icon: Home,        title: 'Recolección a domicilio',description: 'Programa la recolección de tu paquete sin salir de casa, a tu horario.' },
];

export function Benefits() {
  return (
    <>
      {/* ── Sección 1: Cotizar y Enviar estilo DHL ── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">¿Qué quieres hacer hoy?</h2>
            <div className="h-1 w-12 bg-yellow-400 rounded-full mx-auto mt-3" />
          </div>

          {/* Cards estilo DHL — 2 cards + imagen lateral */}
          <div className="grid md:grid-cols-3 gap-0 rounded-2xl overflow-hidden shadow-md border border-gray-200">

            {/* Card Cotizar */}
            <div className="bg-white p-8 flex flex-col justify-between border-r border-gray-200 group hover:bg-yellow-50 transition-colors">
              <div>
                <div className="bg-yellow-100 p-3 rounded-xl w-fit mb-5">
                  <Calculator className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3">Cotizar envío</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Calcula el precio de tu envío al instante. Solo elige origen, destino y tipo de paquete.
                </p>
              </div>
              <Link
                to="/cotizar"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0c1f4a] group-hover:text-yellow-600 transition-colors"
              >
                Cotizar ahora
                <span className="text-base">›</span>
              </Link>
            </div>

            {/* Card Crear envío */}
            <div className="bg-white p-8 flex flex-col justify-between group hover:bg-yellow-50 transition-colors">
              <div>
                <div className="bg-yellow-100 p-3 rounded-xl w-fit mb-5">
                  <Truck className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3">Crear envío</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Genera tu guía en minutos y programa la recolección a domicilio cuando tú quieras.
                </p>
              </div>
              <Link
                to="/envios"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0c1f4a] group-hover:text-yellow-600 transition-colors"
              >
                Crear envío
                <span className="text-base">›</span>
              </Link>
            </div>

           {/* Imagen lateral */}
            <div className="hidden md:block relative overflow-hidden">
              <img
                src="/personal2.webp" // 👈 Solo cambia la ruta aquí
                alt="Operador NovaShip"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Seccion Comienza con NovaShip ── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Comienza con NovaShip</h2>
            <div className="h-1 w-12 bg-yellow-400 rounded-full mx-auto mt-3 mb-4" />
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Crea tu cuenta gratis y accede a todas estas ventajas desde el primer envío.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {cuentaBeneficios.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-3 rounded-xl shrink-0">
                    <Icon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">{b.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{b.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center flex flex-wrap gap-4 justify-center">
            <Link
              to="/registro"
              className="bg-yellow-400 hover:bg-yellow-300 text-[#0c1f4a] px-8 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm"
            >
              Crear cuenta gratis
            </Link>
            <Link
              to="/cotizar"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Cotizar sin cuenta
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}