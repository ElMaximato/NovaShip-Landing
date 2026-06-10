import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Package, MapPin, CheckCircle2, Clock, Truck, AlertCircle, ArrowRight } from 'lucide-react';

// Simulación de resultado de rastreo
const resultadoDemo = {
  guia: 'NS-2024-98765',
  estado: 'En tránsito',
  origen: 'Ciudad de México',
  destino: 'Guadalajara, Jalisco',
  fechaEstimada: '22 de mayo, 2026',
  peso: '2.5 kg',
  servicio: 'Express 24h',
  pasos: [
    {
      id: 1,
      label: 'Paquete recibido',
      sub: 'Hub CDMX — 15 mayo, 09:30',
      done: true,
      icon: CheckCircle2,
    },
    {
      id: 2,
      label: 'En tránsito',
      sub: 'Carretera Federal MEX-GDL — 15 mayo, 14:00',
      done: true,
      icon: Truck,
    },
    {
      id: 3,
      label: 'Centro de distribución',
      sub: 'Guadalajara Norte — 16 mayo, 08:15',
      done: true,
      icon: MapPin,
    },
    {
      id: 4,
      label: 'En reparto',
      sub: 'Ruta de entrega asignada',
      done: false,
      icon: Truck,
    },
    {
      id: 5,
      label: 'Entregado',
      sub: 'Entrega estimada: 22 mayo',
      done: false,
      icon: CheckCircle2,
    },
  ],
};

export function RastreoPage() {
  const [guia, setGuia]               = useState('');
  const [buscado, setBuscado]         = useState(false);
  const [error, setError]             = useState(false);

  const handleRastrear = () => {
    if (!guia.trim()) {
      setError(true);
      setBuscado(false);
      return;
    }
    setError(false);
    setBuscado(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleRastrear();
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Encabezado de página */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Rastrear un paquete</h1>
          {/* Línea amarilla decorativa estilo UPS */}
          <div className="h-1 w-12 bg-yellow-400 rounded-full mt-2 mb-6" />

          {/* Buscador */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
              <div className="flex-1 w-full space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Número de guía
                </label>
                <input
                  type="text"
                  value={guia}
                  onChange={(e) => { setGuia(e.target.value); setError(false); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ej: NS-2024-98765"
                  className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
                    error
                      ? 'border-red-400 focus:ring-red-300 bg-red-50'
                      : 'border-gray-300 focus:ring-yellow-400 focus:border-yellow-400'
                  }`}
                />
                {/* Mensaje de error */}
                {error && (
                  <div className="flex items-center gap-1.5 text-red-600 text-xs">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Por favor ingresa un número de guía.
                  </div>
                )}
              </div>

              <button
                onClick={handleRastrear}
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-[#0c1f4a] px-6 py-3 rounded-lg font-bold text-sm transition-colors shadow-sm whitespace-nowrap"
              >
                <Search className="h-4 w-4" />
                Rastrear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">

        {/* ── RESULTADO DE RASTREO ── */}
        {buscado && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

            {/* Header del resultado */}
            <div className="bg-[#0c1f4a] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-white/60 text-xs mb-0.5">NÚMERO DE GUÍA</p>
                <p className="text-white font-bold text-lg">{resultadoDemo.guia}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-[#0c1f4a] text-xs font-bold px-3 py-1.5 rounded-full self-start sm:self-auto">
                <Clock className="h-3.5 w-3.5" />
                {resultadoDemo.estado}
              </span>
            </div>

            {/* Info general */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
              {[
                { label: 'Origen',           value: resultadoDemo.origen        },
                { label: 'Destino',          value: resultadoDemo.destino       },
                { label: 'Entrega estimada', value: resultadoDemo.fechaEstimada },
                { label: 'Servicio',         value: resultadoDemo.servicio      },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white px-5 py-4">
                  <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-gray-800">{value}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="px-6 py-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">
                Historial de movimientos
              </h2>

              <div className="space-y-0">
                {resultadoDemo.pasos.map((paso, index) => {
                  const Icon = paso.icon;
                  const isLast = index === resultadoDemo.pasos.length - 1;
                  const isActive = paso.done &&
                    (index === resultadoDemo.pasos.length - 1 ||
                     !resultadoDemo.pasos[index + 1].done);

                  return (
                    <div key={paso.id} className="flex gap-4">
                      {/* Línea y punto */}
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                          isActive
                            ? 'bg-yellow-400 border-yellow-400 text-[#0c1f4a]'
                            : paso.done
                              ? 'bg-[#0c1f4a] border-[#0c1f4a] text-white'
                              : 'bg-white border-gray-300 text-gray-300'
                        }`}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        {!isLast && (
                          <div className={`w-0.5 h-8 mt-1 ${paso.done ? 'bg-[#0c1f4a]' : 'bg-gray-200'}`} />
                        )}
                      </div>

                      {/* Texto */}
                      <div className="pb-6">
                        <p className={`text-sm font-semibold ${paso.done ? 'text-gray-900' : 'text-gray-400'}`}>
                          {paso.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{paso.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ── HISTORIAL / ESTADO SIN SESIÓN ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <div className="px-6 py-4 text-sm font-semibold text-[#0c1f4a] border-b-2 border-yellow-400">
              Rastreo reciente
            </div>
            <div className="px-6 py-4 text-sm text-gray-400">
              Lista de seguimiento
            </div>
          </div>

          {/* Estado vacío */}
          <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
            <div className="bg-gray-100 p-5 rounded-full mb-4">
              <Package className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-700 mb-1">
              Artículos recientemente rastreados
            </h3>
            <p className="text-sm text-gray-400 max-w-xs mb-6">
              Inicia sesión o crea una cuenta para ver tus paquetes rastreados aquí.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/login"
                className="flex items-center gap-2 border border-[#0c1f4a] text-[#0c1f4a] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Iniciar sesión <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}