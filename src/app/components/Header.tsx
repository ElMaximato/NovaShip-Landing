import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, CalendarDays, Trophy, Phone, MapPin } from 'lucide-react';

export function Header() {
  const [serviciosOpen, setServiciosOpen] = useState(false);

  const closeAll = () => setServiciosOpen(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">

      {/* Barra superior */}
      <div className="bg-[#295868]">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <span className="text-white/70 text-xs font-light hidden md:flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            Av. Carranza y 45, SLRC
          </span>
          <a href="https://wa.me/526533015976" target="_blank" rel="noreferrer" className="text-white/70 hover:text-[#9cbe46] text-xs font-light hidden md:flex items-center gap-1.5 transition-colors">
            <Phone className="h-3 w-3" />
            653 301 5976
          </a>
        </div>
      </div>

      {/* Barra principal */}
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" onClick={closeAll} className="flex items-center min-w-max">
            <img
              src="/riu_logo.png"
              alt="Riú Padel Complex"
              className="h-10 w-auto object-contain scale-400 -mt-2 origin-left transition-transform"
            />
          </Link>

          {/* Navegación */}
          <nav className="hidden md:flex items-center gap-1">

            {/* Reservar */}
            <Link
              to="/reservar"
              onClick={closeAll}
              className="flex items-center gap-1.5 text-[#295868] hover:text-[#9cbe46] hover:bg-[#9cbe46]/10 px-4 py-2.5 rounded-lg font-medium transition-all text-sm"
            >
              <CalendarDays className="h-4 w-4" />
              Reservar
            </Link>

            {/* Servicios dropdown */}
            <div className="relative">
              <button
                onClick={() => setServiciosOpen(!serviciosOpen)}
                className="flex items-center gap-1.5 text-[#295868] hover:text-[#9cbe46] hover:bg-[#9cbe46]/10 px-4 py-2.5 rounded-lg font-medium transition-all text-sm"
              >
                Servicios
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${serviciosOpen ? 'rotate-180' : ''}`} />
              </button>

              {serviciosOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={closeAll} />
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-20 overflow-hidden">
                    <div className="h-1 w-full bg-[#9cbe46]" />
                    {[
                      { label: 'Reserva una cancha',   sub: '',    to: '/reservar'  },
                      { label: 'Clases y coaching',  sub: 'Primera clase gratis',  to: '/clases'    },
                      { label: 'La Terraza',         sub: 'Restaurant & Bar',      to: '/servicios' },
                      { label: 'Super Juice',        sub: 'Snack bar',             to: '/servicios' },
                    ].map(({ label, sub, to }) => (
                      <Link key={label} to={to} onClick={closeAll}
                        className="flex flex-col px-4 py-3 text-[#295868] hover:bg-[#9cbe46]/10 hover:text-[#9cbe46] transition-colors text-sm border-b border-gray-50 last:border-0">
                        <span className="font-medium">{label}</span>
                        <span className="text-xs text-gray-400 font-light">{sub}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Precios */}
            <Link
              to="/precios"
              onClick={closeAll}
              className="text-[#295868] hover:text-[#9cbe46] hover:bg-[#9cbe46]/10 px-4 py-2.5 rounded-lg font-medium transition-all text-sm"
            >
              Precios
            </Link>

            {/* Torneos */}
            <Link
              to="/torneos"
              onClick={closeAll}
              className="flex items-center gap-1.5 text-[#295868] hover:text-[#9cbe46] hover:bg-[#9cbe46]/10 px-4 py-2.5 rounded-lg font-medium transition-all text-sm"
            >
              <Trophy className="h-4 w-4" />
              Torneos
            </Link>

            {/* Contacto */}
            <Link
              to="/contacto"
              onClick={closeAll}
              className="text-[#295868] hover:text-[#9cbe46] hover:bg-[#9cbe46]/10 px-4 py-2.5 rounded-lg font-medium transition-all text-sm"
            >
              Contacto
            </Link>

          </nav>

          {/* CTA */}
          <Link
            to="/reservar"
            className="hidden md:flex items-center gap-2 bg-[#ec5c26] hover:bg-[#d54f1c] text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-md shadow-[#ec5c26]/30"
          >
            <CalendarDays className="h-4 w-4" />
            Reservar cancha
          </Link>

        </div>
      </div>
    </header>
  );
}