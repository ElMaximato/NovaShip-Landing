import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calculator, Truck, ArrowRight } from 'lucide-react';

const tabs = [
  { id: 'rastrear', label: 'Rastrear', icon: Search,     to: '/rastreo' },
  { id: 'cotizar',  label: 'Cotizar',  icon: Calculator, to: '/cotizar' },
  { id: 'enviar',   label: 'Enviar',   icon: Truck,      to: '/envios'  },
];

export function Hero() {
  const [trackingNum, setTrackingNum] = useState('');
  const navigate = useNavigate();

  const handleTrack = () => {
    if (trackingNum.trim()) navigate('/rastreo');
  };

  return (
    <section className="relative min-h-[600px] flex flex-col justify-center overflow-hidden">

      {/* Imagen de fondo */}
      <img
        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c1f4a]/92 via-[#0c1f4a]/75 to-[#0c1f4a]/30" />

      {/* Acento amarillo lateral izquierdo */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-yellow-400 via-yellow-300 to-transparent" />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-2xl">

          {/* Titular */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Envíos rápidos y <br />
            <span className="text-yellow-300">confiables</span> a<br />
            cualquier destino
          </h1>

         {/* Buscador directo — sin tabs */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-xl">
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="flex items-center gap-2 flex-1 px-3">
                <Search className="h-4 w-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={trackingNum}
                  onChange={(e) => setTrackingNum(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                  placeholder="Ingresa tu número de guía"
                  className="flex-1 py-2.5 text-sm focus:outline-none placeholder-gray-400"
                />
              </div>
              <button
                onClick={handleTrack}
                className="bg-yellow-400 hover:bg-yellow-300 text-[#0c1f4a] px-5 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-1.5 shrink-0"
              >
                Rastrear <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}