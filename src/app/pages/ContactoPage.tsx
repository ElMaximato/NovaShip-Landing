import { MapPin, Phone, Instagram, Clock, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ContactoPage() {
  return (
    <div className="bg-[#f6f7f9] min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Encabezado */}
      <div className="px-6 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9cbe46] mb-3">
            Riú Padel Complex
          </p>
          <h1 className="text-5xl md:text-6xl font-light text-[#0c0d0f] leading-[1.05] tracking-tight">
            Contacto
          </h1>
          <p className="text-base text-gray-500 mt-5 max-w-md font-light leading-relaxed">
            Estamos en San Luis Río Colorado, Sonora. Contáctanos por WhatsApp o visítanos.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-2 gap-6">

          {/* Info de contacto */}
          <div className="space-y-4">

            {/* Dirección */}
            <div className="bg-white rounded-[22px] shadow-sm p-6 flex items-start gap-4">
              <div className="bg-[#295868] p-3 rounded-xl shrink-0">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0c0d0f] mb-1">Dirección</p>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  Av. Carranza y 45<br />
                  San Luis Río Colorado, Sonora<br />
                  México
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-[22px] shadow-sm p-6 flex items-start gap-4">
              <div className="bg-[#25D366] p-3 rounded-xl shrink-0">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0c0d0f] mb-1">WhatsApp</p>
                <a href="https://wa.me/526533015976" target="_blank" rel="noreferrer" className="text-sm text-[#25D366] font-semibold hover:underline">
                  653 301 5976
                </a>
                <p className="text-xs text-gray-400 mt-1 font-light">
                  Respuesta rápida para reservas y dudas
                </p>
              </div>
            </div>

            {/* Instagram */}
            <div className="bg-white rounded-[22px] shadow-sm p-6 flex items-start gap-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl shrink-0">
                <Instagram className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0c0d0f] mb-1">Instagram</p>
                <a href="https://instagram.com/riupadel.mx" target="_blank" rel="noreferrer" className="text-sm text-purple-600 font-semibold hover:underline">
                  @riupadel.mx
                </a>
                <p className="text-xs text-gray-400 mt-1 font-light">
                  Promociones, torneos y novedades
                </p>
              </div>
            </div>

            {/* Horarios */}
            <div className="bg-white rounded-[22px] shadow-sm p-6 flex items-start gap-4">
              <div className="bg-[#ec5c26] p-3 rounded-xl shrink-0">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#0c0d0f] mb-2.5">Horarios</p>
                <div className="space-y-1.5">
                  {[
                    { dia: 'Lunes a Viernes', hora: '6:00 AM – 12:00 AM' },
                    { dia: 'Sábado y Domingo', hora: '6:00 AM – 12:00 AM' },
                  ].map(({ dia, hora }) => (
                    <div key={dia} className="flex justify-between gap-4 text-sm font-light">
                      <span className="text-gray-500">{dia}</span>
                      <span className="font-medium text-[#0c0d0f]">{hora}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Mapa + CTA */}
          <div className="space-y-4">

            {/* Mapa embebido de Google Maps */}
            <div className="bg-white rounded-[22px] shadow-sm overflow-hidden">
              <iframe
                title="Ubicación Riú Padel Complex"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3390.0!2d-114.778!3d32.463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDI3JzQ2LjgiTiAxMTTCsDQ2JzQwLjgiVw!5e0!3m2!1ses!2smx!4v1620000000000!5m2!1ses!2smx"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400 font-light">Av. Carranza y 45, SLRC</p>
                <a href="https://maps.google.com/?q=Av.+Carranza+y+45,+San+Luis+Rio+Colorado,+Sonora" target="_blank" rel="noreferrer" className="text-xs text-[#295868] font-semibold hover:text-[#9cbe46] transition-colors">
                  Abrir en Maps →
                </a>
              </div>
            </div>

            {/* CTA Reservar */}
            <div className="bg-[#295868] rounded-[22px] p-7 space-y-5">
              <div>
                <p className="text-[#9cbe46] text-[10px] font-semibold tracking-[0.14em] uppercase mb-3">
                  ¿Listo para jugar?
                </p>
                <h3 className="text-white font-light text-2xl mb-2 leading-tight">
                  Reserva tu <span className="font-semibold">cancha ahora</span>
                </h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  Elige tu horario y cancha favorita. Te confirmamos por WhatsApp.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link to="/reservar" className="flex items-center justify-center gap-2 bg-[#ec5c26] hover:bg-[#d54f1c] text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors">
                  <CalendarDays className="h-4 w-4" />
                  Reservar cancha
                </Link>
                <Link to="/precios" className="flex items-center justify-center gap-2 border border-white/30 text-white px-5 py-3 rounded-full font-medium text-sm hover:bg-white/10 transition-colors">
                  Ver precios
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}