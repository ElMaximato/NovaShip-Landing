import { Link } from 'react-router-dom';
import { Trophy, ArrowRight, Instagram } from 'lucide-react';

const calendario = [
  { mes: 'Enero', evento: 'Batallas Riú' },
  { mes: 'Febrero', evento: 'Torneo PadeLove' },
  { mes: 'Marzo', evento: '1ra Etapa Circuito Riú' },
  { mes: 'Abril', evento: 'Smash Kids' },
  { mes: 'Mayo', evento: '2da Etapa Circuito Riú / Torneo Campus League' },
  { mes: 'Julio', evento: '3ra Etapa Circuito Riú' },
  { mes: 'Septiembre', evento: 'Etapa Elite Club' },
  { mes: 'Noviembre', evento: 'Viaje Anual Acapulco' },
  { mes: 'Diciembre', evento: 'Torneo Navideño / Aniversario' },
];

export function TorneosPage() {
  return (
    <div className="bg-[#f6f7f9] min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Banner superior */}
      <div className="relative overflow-hidden h-[280px] md:h-[340px]">
        <img
          src="/padel.jpg"
          alt="Torneos Riú Padel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#295868]/95 via-[#295868]/70 to-[#295868]/20" />

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9cbe46] mb-3">
            Circuito Riú 2026
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-white leading-tight tracking-tight">
            Compite en <span className="font-semibold">Riú</span>
          </h1>
          <p className="text-base text-white/70 mt-3 font-light max-w-md">
            Uno de los clubes más activos de la ciudad en competencias de pádel.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-14">

        {/* Calendario de eventos */}
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9cbe46] mb-2">
            Calendario 2026
          </p>
          <h2 className="text-3xl font-light text-[#0c0d0f] tracking-tight mb-8">
            Un nuevo año, <span className="font-semibold">más pádel</span>
          </h2>

          <div className="bg-white rounded-[22px] shadow-sm overflow-hidden divide-y divide-gray-100">
            {calendario.map(({ mes, evento }) => (
              <div key={mes} className="flex items-center gap-6 px-6 py-5">
                <div className="w-24 shrink-0">
                  <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#9cbe46]">
                    {mes}
                  </p>
                </div>
                <p className="text-sm font-medium text-[#0c0d0f]">{evento}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 font-light mt-4">
            Fechas exactas y detalles de inscripción se anuncian en Instagram antes de cada evento.
          </p>
        </div>

        {/* Categorías */}
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#295868] mb-6">
            Para todos los niveles
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-[22px] p-6 shadow-sm">
              <Trophy className="h-6 w-6 text-[#ec5c26] mb-3" />
              <p className="text-sm font-semibold text-[#0c0d0f] mb-1">Por categorías</p>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Torneos organizados por nivel: 3ra, 4ta, 5ta y 6ta categoría.
              </p>
            </div>
            <div className="bg-white rounded-[22px] p-6 shadow-sm">
              <Trophy className="h-6 w-6 text-[#9cbe46] mb-3" />
              <p className="text-sm font-semibold text-[#0c0d0f] mb-1">Varoniles y femeniles</p>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Ramas separadas para que compitas en tu categoría.
              </p>
            </div>
          </div>
        </div>

        {/* CTA — Instagram para inscripciones */}
        <div className="bg-[#295868] rounded-[28px] p-10 md:p-14 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-center sm:text-left">
            <h3 className="text-3xl font-light text-white leading-tight">
              ¿Listo para <span className="font-semibold">competir?</span>
            </h3>
            <p className="text-white/60 text-sm mt-2 font-light">
              Síguenos en Instagram para inscripciones y fechas exactas de cada torneo.
            </p>
          </div>
          
            < a href="https://instagram.com/riupadel.mx"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-[#ec5c26] hover:bg-[#d54f1c] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors shadow-lg whitespace-nowrap"
          >
            <Instagram className="h-4 w-4" />
            @riupadel.mx
          </a>
        </div>

        <div className="text-center">
          <Link
            to="/reservar"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#295868] hover:text-[#9cbe46] transition-colors"
          >
            Practica antes del torneo — reserva tu cancha
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}