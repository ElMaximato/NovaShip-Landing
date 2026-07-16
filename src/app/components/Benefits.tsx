import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Trophy, Users2, ArrowRight } from 'lucide-react';

const stats = [
  {
    icon: MapPin,
    label: '9 Canchas techadas',
    description: 'Canchas de primer nivel con iluminación nocturna, disponibles todos los días.',
    image: '/cancha.jpg',
  },
  {
    icon: Trophy,
    label: 'Torneos organizados',
    description: 'Uno de los clubes más activos de la ciudad en competencias de pádel.',
    image: '/comunidad.PNG',
  },
  {
    icon: Users2,
    label: 'Recomienda el club',
    description: 'Una comunidad de jugadores que vuelve una y otra vez.',
    image: '/1.jpg',
  },
  {
    icon: Star,
    label: 'Calificación de jugadores',
    description: 'Reseñas reales de quienes ya juegan con nosotros.',
    image: '/taco.PNG',
  },
];

export function Benefits() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-[1350px] mx-auto">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#ec5c26] mb-3">
              Por qué elegirnos
            </p>
            <h2 className="text-5xl md:text-6xl font-light text-[#0c0d0f] leading-[1.05] tracking-tight">
              El club más <span className="font-semibold">activo</span><br />de la ciudad
            </h2>
          </div>
          <p className="text-base text-gray-500 max-w-xs leading-relaxed font-light">
            Riú Padel Complex es más que canchas — es una comunidad que sigue creciendo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            const isHovered = hovered === i;
            return (
              <div
                key={i}
                className="group relative rounded-[22px] overflow-hidden cursor-default"
                style={{ aspectRatio: '3/4' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <img
                  src={s.image}
                  alt={s.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div
                    className="mb-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? '#9cbe46' : 'rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  <p className="text-3xl font-light text-white leading-none mb-1">{s.value}</p>
                  <h3 className="text-sm font-semibold text-white/90 mb-2">{s.label}</h3>

                  <p
                    className="text-xs text-white/70 leading-relaxed font-light transition-all duration-400 ease-out"
                    style={{
                      maxHeight: isHovered ? '80px' : '0px',
                      opacity: isHovered ? 1 : 0,
                      overflow: 'hidden',
                    }}
                  >
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/servicios"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#295868] hover:text-[#9cbe46] transition-colors"
          >
            Conoce todos nuestros servicios e instalaciones
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}