import { useState } from 'react';
import { MapPin, ChevronDown, Package } from 'lucide-react';

const tiposPaquete = [
  { id: 'sobre',   label: 'Sobre',        desc: 'Hasta 0.5 kg',  icon: '✉️', detalle: 'Documentos y sobres' },
  { id: 'pequeña', label: 'Caja pequeña', desc: 'Hasta 5 kg',    icon: '📦', detalle: 'Artículos pequeños'  },
  { id: 'mediana', label: 'Caja mediana', desc: 'Hasta 20 kg',   icon: '📦', detalle: 'Artículos medianos'  },
  { id: 'grande',  label: 'Caja grande',  desc: 'Hasta 50 kg',   icon: '📦', detalle: 'Artículos grandes'   },
];

const tiposServicio = [
  { id: 'economico', label: 'Económico', desc: '5–7 días hábiles', precio: 'Desde $89',  badge: ''           },
  { id: 'estandar',  label: 'Estándar',  desc: '2–3 días hábiles', precio: 'Desde $149', badge: ''           },
  { id: 'express',   label: 'Express',   desc: '1 día hábil',      precio: 'Desde $299', badge: 'Más rápido' },
];

const contenidos = [
  'Documentos', 'Ropa y textiles', 'Electrónicos',
  'Artículo frágil', 'Alimentos', 'Otro',
];

export function CotizarPage() {
  const [paquete,   setPaquete]   = useState('');
  const [servicio,  setServicio]  = useState('estandar');
  const [cotizando, setCotizando] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Encabezado estilo UPS */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Cotiza tu envío</h1>
          <div className="h-1 w-12 bg-yellow-400 rounded-full mt-2" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-5">

        {/* ── Origen y Destino ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Origen y Destino
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Ciudad de origen</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ej: Ciudad de México"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Ciudad de destino</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ej: Guadalajara"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Código postal origen</label>
              <input
                type="text"
                placeholder="Ej: 06600"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Código postal destino</label>
              <input
                type="text"
                placeholder="Ej: 44100"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
              />
            </div>
          </div>
        </div>

        {/* ── Tipo de paquete ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Tipo de paquete
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {tiposPaquete.map((tp) => (
              <button
                key={tp.id}
                onClick={() => setPaquete(tp.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center ${
                  paquete === tp.id
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <span className="text-2xl">{tp.icon}</span>
                <span className={`text-sm font-semibold ${paquete === tp.id ? 'text-[#0c1f4a]' : 'text-gray-700'}`}>
                  {tp.label}
                </span>
                <span className="text-xs text-gray-400">{tp.desc}</span>
                <span className="text-xs text-gray-400">{tp.detalle}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Tipo de servicio ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Tipo de servicio
          </h2>

          <div className="space-y-3">
            {tiposServicio.map((s) => (
              <button
                key={s.id}
                onClick={() => setServicio(s.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                  servicio === s.id
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    servicio === s.id ? 'border-yellow-400' : 'border-gray-300'
                  }`}>
                    {servicio === s.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">{s.label}</span>
                      {s.badge && (
                        <span className="text-xs bg-[#0c1f4a] text-white px-2 py-0.5 rounded-full">
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${servicio === s.id ? 'text-[#0c1f4a]' : 'text-gray-400'}`}>
                  {s.precio}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Contenido del paquete ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Contenido
          </h2>
          <div className="relative">
            <select className="w-full appearance-none px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition bg-white">
              <option value="">Selecciona el tipo de contenido</option>
              {contenidos.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* ── Botón calcular ── */}
        <button
          onClick={() => setCotizando(true)}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#0c1f4a] py-3 rounded-xl font-bold text-sm transition-colors shadow-sm"
        >
          Calcular precio
        </button>

        {/* ── Resultado ── */}
        {cotizando && (
          <div className="bg-white rounded-xl border-2 border-yellow-400 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Resultado estimado
              </h2>
              <span className="text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full">
                Disponible
              </span>
            </div>

            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  $149.00 <span className="text-base font-normal text-gray-400">MXN</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Servicio Estándar · Entrega en 2–3 días hábiles
                </p>
              </div>
              <button className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors">
                Contratar envío
              </button>
            </div>

            <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-400">Paquete</p>
                <p className="text-sm font-semibold text-gray-700 mt-0.5 flex items-center justify-center gap-1">
                  <Package className="h-3.5 w-3.5" /> Caja mediana
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Ruta</p>
                <p className="text-sm font-semibold text-gray-700 mt-0.5">CDMX → GDL</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Seguro</p>
                <p className="text-sm font-semibold text-gray-700 mt-0.5">Básico incluido</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}