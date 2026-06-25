import { Link } from 'react-router-dom';
import { Phone, MapPin, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start justify-between gap-8">

        {/* Logo e info */}
        <div className="space-y-3">
          <Link to="/">
            <img src="/logoRiu.png" alt="Riú Padel Complex" className="h-10 w-auto" />
          </Link>
          <div className="space-y-1.5">
            <p className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin className="h-3.5 w-3.5 text-[#2D6E7E]" />
              Av. Carranza y 45, SLRC, Sonora
            </p>
            <a href="https://wa.me/526533015976" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#2D6E7E] transition-colors">
              <Phone className="h-3.5 w-3.5 text-[#2D6E7E]" />
              653 301 5976
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-500">
          <Link to="/reservar"   className="hover:text-gray-900 transition-colors">Reservar</Link>
          <Link to="/precios"    className="hover:text-gray-900 transition-colors">Precios</Link>
          <Link to="/clases"     className="hover:text-gray-900 transition-colors">Clases</Link>
          <Link to="/torneos"    className="hover:text-gray-900 transition-colors">Torneos</Link>
          <Link to="/contacto"   className="hover:text-gray-900 transition-colors">Contacto</Link>
          <Link to="/privacidad" className="hover:text-gray-900 transition-colors">Aviso de privacidad</Link>
        </div>

        {/* Redes */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Síguenos</p>
          <div className="flex items-center gap-3">
            <a href="https://instagram.com/riupadel.mx" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#E8511A] transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#2D6E7E] transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
          <p className="text-xs text-gray-400">@riupadel.mx</p>
        </div>

      </div>

      <div className="border-t border-gray-200 py-4">
        <p className="text-center text-xs text-gray-400">
          {new Date().getFullYear()} © Riú Padel Complex — Todos los derechos reservados
        </p>
      </div>

    </footer>
  );
}