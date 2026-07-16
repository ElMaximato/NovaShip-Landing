import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';

function IconRaquetaGrande({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 240" fill="none" className={className}>
      {/* Cabeza de la raqueta */}
      <ellipse cx="100" cy="85" rx="72" ry="80" stroke="currentColor" strokeWidth="6" />
      {/* Mango */}
      <path d="M100 165 L100 225" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
      <path d="M78 225 L122 225" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
      {/* Agujeros / patrón de la cara */}
      <circle cx="100" cy="85" r="4" fill="currentColor" opacity="0.5" />
      <path
        d="M60 45 L140 125 M140 45 L60 125 M40 65 L160 105 M40 105 L160 65 M70 30 L130 140 M130 30 L70 140"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.25"
      />
    </svg>
  );
}

function IconPelotaGrande({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="5" />
      <path d="M18 28c14 10 14 34 0 44M82 28c-14 10-14 34 0 44" stroke="currentColor" strokeWidth="3" opacity="0.6" />
    </svg>
  );
}

export function NotFoundPage() {
  return (
    <div
      className="min-h-screen bg-[#f6f7f9] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Elementos decorativos de fondo */}
      <IconRaquetaGrande className="absolute -top-10 -right-16 w-72 h-80 text-[#295868]/[0.05] rotate-12 pointer-events-none" />
      <IconPelotaGrande className="absolute bottom-10 -left-12 w-40 h-40 text-[#ec5c26]/[0.07] pointer-events-none" />

      <div className="relative">
        {/* Raqueta principal con "404" como si fuera la pelota */}
        <div className="relative mx-auto mb-8 w-fit">
          <IconRaquetaGrande className="w-40 h-48 text-[#9cbe46] mx-auto" />
          <div className="absolute inset-0 flex items-start justify-center pt-8">
            <span className="text-3xl font-light tracking-tight text-[#295868]">404</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-light text-[#0c0d0f] leading-tight tracking-tight mb-3">
          Fuera de <span className="font-semibold">cancha</span>
        </h1>
        <p className="text-sm text-gray-500 font-light mb-10 max-w-sm mx-auto leading-relaxed">
          La página que buscas no existe o fue movida. Volvamos a la cancha principal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 bg-[#ec5c26] hover:bg-[#d54f1c] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors shadow-lg"
          >
            <Home className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}