import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-200 border-t border-gray-300 mt-auto">

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start justify-between gap-8">

        {/* Logo */}
        <div>
          <Link to="/">
            <img src="/logoNovaShip.png" alt="NovaShip" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Links legales */}
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-500">
          <Link to="/terminos"   className="hover:text-gray-900 transition-colors">Términos y condiciones</Link>
          <Link to="/privacidad" className="hover:text-gray-900 transition-colors">Aviso de privacidad</Link>
          <Link to="/contacto"   className="hover:text-gray-900 transition-colors">Centro de contacto</Link>
          <Link to="/ayuda"      className="hover:text-gray-900 transition-colors">Ayuda</Link>
        </div>

        {/* Redes sociales */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Síguenos</p>
          <div className="flex items-center gap-3">
            <a href="https://youtube.com"   target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors"><Youtube   className="h-5 w-5" /></a>
            <a href="https://facebook.com"  target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors"><Facebook  className="h-5 w-5" /></a>
            <a href="https://linkedin.com"  target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors"><Linkedin  className="h-5 w-5" /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors"><Instagram className="h-5 w-5" /></a>
          </div>
        </div>

      </div>

      {/* Franja inferior */}
      <div className="border-t border-gray-300 py-4">
        <p className="text-center text-xs text-gray-500">
          {new Date().getFullYear()} © — Todos los derechos reservados
        </p>
      </div>

    </footer>
  );
}