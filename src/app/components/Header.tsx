import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, User, CalendarDays, Trophy, Phone } from 'lucide-react';


export function Header() {
  const [serviciosOpen, setServiciosOpen] = useState(false);

  const closeAll = () => setServiciosOpen(false);

  return (
    <header className="bg-[#2D6E7E] sticky top-0 z-50">

      {/* Barra superior */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <span className="text-white/60 text-xs hidden md:block">
            📍 Av. Carranza y 45, SLRC
          </span>
          <div className="flex items-center gap-6">
            <span className="text-white/60 text-xs hidden md:block">
              <Phone className="h-3 w-3 inline mr-1" />
              653 301 5976
            </span>
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs transition-colors"
            >
              <User className="h-3.5 w-3.5" />
              Iniciar sesión / Registrarse
            </Link>
          </div>
        </div>
      </div>

      {/* Barra principal */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" onClick={closeAll} className="flex items-center min-w-max">
            <img
              src="/logoRiu.png"
              alt="Riú Padel Complex"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Navegación */}
          <nav className="hidden md:flex items-center gap-1">

            {/* Reservar */}
            <Link
              to="/reservar"
              onClick={closeAll}
              className="flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg font-semibold transition-all text-sm"
            >
              <CalendarDays className="h-4 w-4" />
              Reservar
            </Link>

            {/* Servicios dropdown */}
            <div className="relative">
              <button
                onClick={() => setServiciosOpen(!serviciosOpen)}
                className="flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg font-semibold transition-all text-sm"
              >
                Servicios
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${serviciosOpen ? 'rotate-180' : ''}`} />
              </button>

              {serviciosOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={closeAll} />
                  <div className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-20">
                    <div className="h-1 w-full bg-[#8DC63F] rounded-t-xl mb-1" />
                    {[
                      { label: 'Canchas de pádel',   sub: 'Reserva tu horario',       to: '/reservar'  },
                      { label: 'Clases y coaching',  sub: 'Primera clase gratis',      to: '/clases'    },
                      { label: 'La Terraza',         sub: 'Restaurant & Bar',          to: '/servicios' },
                      { label: 'Super Juice',        sub: 'Snack bar',                 to: '/servicios' },
                    ].map(({ label, sub, to }) => (
                      <Link key={label} to={to} onClick={closeAll}
                        className="flex flex-col px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors text-sm border-b border-gray-50 last:border-0">
                        <span className="font-medium">{label}</span>
                        <span className="text-xs text-gray-400">{sub}</span>
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
              className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg font-semibold transition-all text-sm"
            >
              Precios
            </Link>

            {/* Torneos */}
            <Link
              to="/torneos"
              onClick={closeAll}
              className="flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg font-semibold transition-all text-sm"
            >
              <Trophy className="h-4 w-4" />
              Torneos
            </Link>

            {/* Contacto */}
            <Link
              to="/contacto"
              onClick={closeAll}
              className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg font-semibold transition-all text-sm"
            >
              Contacto
            </Link>

          </nav>

          {/* CTA */}
          <Link
            to="/reservar"
            className="hidden md:flex items-center gap-2 bg-[#8DC63F] hover:bg-[#7db535] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-lg"
          >
            <CalendarDays className="h-4 w-4" />
            Reservar cancha
          </Link>

        </div>
      </div>
    </header>
  );
}