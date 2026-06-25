import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight, Phone } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[600px] flex flex-col justify-center overflow-hidden">

      <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=1600" alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#2D6E7E]/95 via-[#2D6E7E]/80 to-[#2D6E7E]/40" />

      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#8DC63F] via-[#8DC63F]/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-2xl">

          <div className="flex items-center gap-3 mb-5">
            <div className="h-0.5 w-8 bg-[#8DC63F]" />
            <p className="text-[#8DC63F] font-semibold text-sm uppercase tracking-widest">
              San Luis Río Colorado, Sonora
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            El mejor complejo de{' '}
            <span className="text-[#8DC63F]">pádel</span>{' '}
            de la región
          </h1>

          <p className="text-white/70 text-lg mb-8 max-w-lg leading-relaxed">
            Canchas de primer nivel, clases para todos los niveles, restaurant & bar. Todo en un solo lugar.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Link to="/reservar" className="flex items-center gap-2 bg-[#8DC63F] hover:bg-[#7db535] text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg">
              <CalendarDays className="h-5 w-5" />
              Reservar cancha
            </Link>
            <Link to="/precios" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-7 py-3.5 rounded-xl font-bold text-sm transition-colors">
              Ver precios <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Tarjeta de horarios */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 max-w-xl">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
              Horarios y tarifas — Lunes a Viernes
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { hora: '6AM – 3PM',  precio: '2x1',  label: 'la hora', color: 'bg-[#E8511A]' },
                { hora: '4PM – 6PM',  precio: '$400', label: 'la hora', color: 'bg-[#2D6E7E]' },
                { hora: '7PM – 12AM', precio: '$500', label: 'la hora', color: 'bg-[#1a4d5a]' },
              ].map(({ hora, precio, label, color }) => (
                <div key={hora} className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-white/60 text-xs mb-1">{hora}</p>
                  <p className={`${color} text-white text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-1`}>{precio}</p>
                  <p className="text-white/50 text-xs">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
              <p className="text-white/50 text-xs">Sáb y Dom: 2 horas x $500</p>
              <a href="https://wa.me/526533015976" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[#8DC63F] text-xs font-semibold hover:text-white transition-colors">
                <Phone className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}