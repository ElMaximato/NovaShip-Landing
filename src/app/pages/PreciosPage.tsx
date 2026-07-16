import { Link } from 'react-router-dom';
import { CalendarDays, CheckCircle2 } from 'lucide-react';

const tarifasSemana = [
  {
    horario: '6:00 AM – 3:00 PM',
    precio: '2x1',
    detalle: 'la hora',
    dias: 'Lunes a Viernes',
    color: '#ec5c26',
    badge: 'Matutino',
    incluye: ['2 horas al precio de 1', 'Canchas disponibles', 'Iluminación incluida'],
  },
  {
    horario: '4:00 PM – 6:00 PM',
    precio: '$400',
    detalle: 'la hora',
    dias: 'Lunes a Viernes',
    color: '#295868',
    badge: 'Tarde',
    incluye: ['Precio por hora', 'Canchas disponibles', 'Iluminación incluida'],
  },
  {
    horario: '7:00 PM – 12:00 AM',
    precio: '$500',
    detalle: 'la hora',
    dias: 'Lunes a Viernes',
    color: '#1a4d5a',
    badge: 'Nocturno',
    incluye: ['Precio por hora', 'Canchas disponibles', 'Iluminación incluida'],
  },
];

const tarifasFinSemana = [
  {
    horario: 'Todo el día',
    precio: '$500',
    detalle: '2 horas',
    dias: 'Sábado y Domingo',
    color: '#9cbe46',
    badge: 'Fin de semana',
    incluye: ['2 horas corridas', 'Canchas disponibles', 'Iluminación incluida'],
  },
];

const promociones = [
  {
    titulo: 'Viernes de Estudiantes',
    desc: '2 horas por $350 de 6:00 AM a 6:00 PM. Válido para 4 alumnos presentando credencial.',
    badge: 'Válido viernes',
    color: '#9cbe46',
  },
  {
    titulo: 'Primera clase gratis',
    desc: '¿Nunca has jugado pádel? Tu primera clase es completamente gratis. Incluye coach y palas.',
    badge: 'Para nuevos jugadores',
    color: '#295868',
  },
];

export function PreciosPage() {
  return (
    <div className="bg-[#f6f7f9] min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Encabezado */}
      <div className="px-6 pt-20 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9cbe46] mb-3">
            Riú Padel Complex
          </p>
          <h1 className="text-5xl md:text-6xl font-light text-[#0c0d0f] leading-[1.05] tracking-tight">
            Precios y <span className="font-semibold">horarios</span>
          </h1>
          <p className="text-base text-gray-500 mt-5 max-w-md font-light leading-relaxed">
            Tarifas reales de Riú Padel Complex. Sin costos ocultos.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pb-20 space-y-16">

        {/* Tarifas Lunes a Viernes */}
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#295868] mb-6">
            Lunes a viernes
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {tarifasSemana.map((t, i) => (
              <div key={i} className="bg-white rounded-[22px] overflow-hidden shadow-sm">
                <div className="px-5 py-5" style={{ backgroundColor: t.color }}>
                  <span className="text-white/70 text-[10px] font-semibold tracking-[0.14em] uppercase">{t.badge}</span>
                  <p className="text-white font-semibold text-sm mt-1.5">{t.horario}</p>
                </div>
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-light text-[#0c0d0f] tracking-tight">{t.precio}</span>
                    <span className="text-sm text-gray-400 mb-1 font-light">{t.detalle}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 font-light">{t.dias}</p>
                </div>
                <div className="px-5 py-4 space-y-2">
                  {t.incluye.map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-gray-600 font-light">
                      <CheckCircle2 className="h-4 w-4 text-[#9cbe46] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tarifas Fin de Semana */}
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#ec5c26] mb-6">
            Fin de semana
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {tarifasFinSemana.map((t, i) => (
              <div key={i} className="bg-white rounded-[22px] overflow-hidden shadow-sm">
                <div className="px-5 py-5" style={{ backgroundColor: t.color }}>
                  <span className="text-white/70 text-[10px] font-semibold tracking-[0.14em] uppercase">{t.badge}</span>
                  <p className="text-white font-semibold text-sm mt-1.5">{t.horario}</p>
                </div>
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-light text-[#0c0d0f] tracking-tight">{t.precio}</span>
                    <span className="text-sm text-gray-400 mb-1 font-light">{t.detalle}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 font-light">{t.dias}</p>
                </div>
                <div className="px-5 py-4 space-y-2">
                  {t.incluye.map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-gray-600 font-light">
                      <CheckCircle2 className="h-4 w-4 text-[#9cbe46] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Card de nota */}
            <div className="bg-[#295868] rounded-[22px] p-7 flex flex-col justify-between">
              <div>
                <p className="text-[#9cbe46] text-[10px] font-semibold tracking-[0.14em] uppercase mb-3">
                  ¿Tienes dudas?
                </p>
                <h3 className="text-white font-light text-2xl mb-2 leading-tight">
                  Reserva tu <span className="font-semibold">cancha ahora</span>
                </h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  Contáctanos por WhatsApp para confirmar disponibilidad o haz tu reserva directamente desde la plataforma.
                </p>
              </div>
              <div className="flex flex-col gap-3 mt-6">
                <Link
                  to="/reservar"
                  className="flex items-center justify-center gap-2 bg-[#ec5c26] hover:bg-[#d54f1c] text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors"
                >
                  <CalendarDays className="h-4 w-4" />
                  Reservar cancha
                </Link>
                <a href="https://wa.me/526533015976" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border border-white/30 text-white px-5 py-3 rounded-full font-medium text-sm hover:bg-white/10 transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Promociones especiales */}
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9cbe46] mb-6">
            Promociones especiales
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {promociones.map((p, i) => (
              <div key={i} className="bg-white rounded-[22px] p-7 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-[#0c0d0f]">{p.titulo}</h3>
                  <span
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${p.color}1A`, color: p.color }}
                  >
                    {p.badge}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed font-light">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nota final */}
        <div className="bg-white rounded-2xl p-5 flex items-start gap-3 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ec5c26] shrink-0 mt-2" />
          <p className="text-sm text-gray-500 leading-relaxed font-light">
            Los precios y promociones pueden variar. Síguenos en Instagram{' '}
            <a href="https://instagram.com/riupadel.mx" target="_blank" rel="noreferrer"
              className="font-semibold text-[#295868] hover:text-[#9cbe46] transition-colors">@riupadel.mx
            </a>{' '}
            para estar al día con las últimas ofertas.
          </p>
        </div>

      </div>
    </div>
  );
}