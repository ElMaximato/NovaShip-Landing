import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Calculator, Search, Truck, User } from 'lucide-react';

export function Header() {
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const [envioOpen, setEnvioOpen] = useState(false);

  const closeAll = () => {
    setServiciosOpen(false);
    setEnvioOpen(false);
  };

  return (
    <header className="bg-yellow-400 sticky top-0 z-50">

      {/* Barra superior delgada */}
      <div className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-end items-center gap-6">
          <span className="text-[#0c1f4a]/60 text-xs hidden md:block">
            📞 653 136 1234
          </span>
          <Link
            to="/login"
            className="flex items-center gap-1.5 text-[#0c1f4a]/70 hover:text-[#0c1f4a] text-xs transition-colors"
          >
            <User className="h-3.5 w-3.5" />
            Iniciar sesión / Registrarse
          </Link>
        </div>
      </div>

      {/* Barra principal */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          <Link to="/" onClick={closeAll} className="flex items-center min-w-max">
          <img
            src="/logoNovaShip.png"
            alt="NovaShip"
            className="h-14 w-auto object-contain"
          />
        </Link>

          {/* Navegación */}
          <nav className="hidden md:flex items-center gap-1">

            {/* Envío dropdown */}
            <div className="relative">
              <button
                onClick={() => { setEnvioOpen(!envioOpen); setServiciosOpen(false); }}
                className="flex items-center gap-1.5 text-[#0c1f4a] hover:bg-black/10 px-4 py-3 rounded-lg font-semibold transition-all text-sm"
              >
                <Truck className="h-4 w-4" />
                Envío
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${envioOpen ? 'rotate-180' : ''}`} />
              </button>

              {envioOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={closeAll} />
                  <div className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-20">
                    <Link to="/envios" onClick={closeAll}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors text-sm">
                      <Truck className="h-4 w-4 text-yellow-500" />
                      <div>
                        <p className="font-medium">Crear envío</p>
                        <p className="text-xs text-gray-400">Genera tu guía</p>
                      </div>
                    </Link>
                    <Link to="/cotizar" onClick={closeAll}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors text-sm">
                      <Calculator className="h-4 w-4 text-yellow-500" />
                      <div>
                        <p className="font-medium">Cotizar envío</p>
                        <p className="text-xs text-gray-400">Calcula el precio</p>
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Rastreo */}
            {/* Servicios — link directo */}
            <Link
              to="/servicios"
              onClick={closeAll}
              className="flex items-center gap-1.5 text-[#0c1f4a] hover:bg-black/10 px-4 py-3 rounded-lg font-semibold transition-all text-sm"
            >
              Servicios
            </Link>

            {/* Ayuda */}
            <Link
              to="/ayuda"
              onClick={closeAll}
              className="text-[#0c1f4a] hover:bg-black/10 px-4 py-3 rounded-lg font-semibold transition-all text-sm"
            >
              Ayuda
            </Link>
          </nav>

          {/* CTA rojo */}
          <Link
            to="/cotizar"
            className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-red-900/20"
          >
            <Calculator className="h-4 w-4" />
            Cotizar ahora
          </Link>

        </div>
      </div>
    </header>
  );
}