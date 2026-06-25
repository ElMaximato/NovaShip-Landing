import { Link } from 'react-router-dom';
import { CalendarDays, Trophy, Users, Utensils, Star, Clock, CreditCard, Bell } from 'lucide-react';

const benefitsList = [
  { icon: CalendarDays, title: 'Reserva fácil',          description: 'Reserva tu cancha en minutos desde la web o por WhatsApp.' },
  { icon: Trophy,       title: 'Torneos y competencias', description: 'Participa en torneos locales organizados para todos los niveles.' },
  { icon: Users,        title: 'Para todos los niveles', description: 'Desde principiantes hasta jugadores avanzados, tenemos tu espacio.' },
  { icon: Utensils,     title: 'Restaurant & Bar',       description: 'La Terraza y Super Juice disponibles para antes y después de jugar.' },
];

const cuentaBeneficios = [
  { icon: Star,        title: 'Primera clase gratis',    description: 'Regístrate y obtén tu primera clase de pádel sin costo. Incluye coach y palas.' },
  { icon: CreditCard,  title: 'Reservas más rápidas',    description: 'Guarda tus datos y reserva tu cancha favorita en segundos.' },
  { icon: Bell,        title: 'Promociones exclusivas',  description: 'Recibe alertas de descuentos, viernes de estudiantes y eventos especiales.' },
  { icon: Clock,       title: 'Historial de reservas',   description: 'Consulta tus reservas anteriores y vuelve a agendar con un clic.' },
];

export function Benefits() {
  return (
    <>
      {/* ── Sección 1: ¿Qué quieres hacer hoy? ── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">¿Qué quieres hacer hoy?</h2>
            <div className="h-1 w-12 bg-[#8DC63F] rounded-full mx-auto mt-3" />
          </div>

          <div className="grid md:grid-cols-3 gap-0 rounded-2xl overflow-hidden shadow-md border border-gray-200">

            {/* Card Reservar */}
            <div className="bg-white p-8 flex flex-col justify-between border-r border-gray-200 group hover:bg-green-50 transition-colors">
              <div>
                <div className="bg-green-100 p-3 rounded-xl w-fit mb-5">
                  <CalendarDays className="h-6 w-6 text-[#8DC63F]" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3">Reservar cancha</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Elige tu horario, selecciona la cancha disponible y confirma tu reserva al instante.
                </p>
              </div>
              <Link to="/reservar" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#2D6E7E] group-hover:text-[#8DC63F] transition-colors">
                Reservar ahora <span className="text-base">›</span>
              </Link>
            </div>

            {/* Card Clases */}
            <div className="bg-white p-8 flex flex-col justify-between group hover:bg-green-50 transition-colors">
              <div>
                <div className="bg-green-100 p-3 rounded-xl w-fit mb-5">
                  <Users className="h-6 w-6 text-[#8DC63F]" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3">Tomar clases</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  ¿Nunca has jugado pádel? Tu primera clase es gratis. Incluye coach y palas.
                </p>
              </div>
              <Link to="/clases" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#2D6E7E] group-hover:text-[#8DC63F] transition-colors">
                Ver clases <span className="text-base">›</span>
              </Link>
            </div>

            {/* Imagen lateral */}
            <div className="hidden md:block relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=600"
                alt="Jugadores en Riú Padel"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#2D6E7E]/30" />
            </div>

          </div>
        </div>
      </section>

      {/* ── Sección 2: Por qué elegirnos ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">¿Por qué elegir Riú Padel?</h2>
            <div className="h-1 w-12 bg-[#8DC63F] rounded-full mx-auto mt-3" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefitsList.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="bg-[#2D6E7E] p-5 rounded-2xl">
                      <Icon className="h-8 w-8 text-[#8DC63F]" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{b.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Sección 3: Comienza con Riú ── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Comienza con Riú Padel</h2>
            <div className="h-1 w-12 bg-[#8DC63F] rounded-full mx-auto mt-3 mb-4" />
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Crea tu cuenta gratis y accede a beneficios exclusivos desde tu primera reserva.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {cuentaBeneficios.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-xl shrink-0">
                    <Icon className="h-6 w-6 text-[#8DC63F]" />
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
            <Link to="/registro" className="bg-[#8DC63F] hover:bg-[#7db535] text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm">
              Crear cuenta gratis
            </Link>
            <Link to="/reservar" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">
              Reservar sin cuenta
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}