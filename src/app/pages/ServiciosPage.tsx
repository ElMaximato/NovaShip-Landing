import { Link } from 'react-router-dom';
import { Truck, Globe, Zap, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';

const servicios = [
  {
    icon: Truck,
    title: 'Envío Nacional',
    desc: 'Cobertura completa en toda la República Mexicana con entrega garantizada.',
    precio: 'Desde $89 MXN',
    color: 'bg-yellow-100 text-yellow-600',
    features: [
      'Entrega en 1–3 días hábiles',
      'Rastreo',
      'Seguro básico incluido',
      'Recolección a domicilio',
    ],
  },
  {
    icon: Globe,
    title: 'Envío Internacional',
    desc: 'Enviamos a más de 45 países con gestión aduanera y rastreo puerta a puerta.',
    precio: 'Desde $349 MXN',
    color: 'bg-blue-100 text-blue-600',
    features: [
      'Más de 45 países',
      'Gestión aduanera incluida',
      'Rastreo internacional',
      'Soporte en español',
    ],
  },
  {
    icon: Zap,
    title: 'Entrega Express',
    desc: 'Servicio urgente con entrega garantizada el mismo día o en menos de 24 horas.',
    precio: 'Desde $299 MXN',
    color: 'bg-red-100 text-red-600',
    features: [
      'Entrega en menos de 24h',
      'Prioridad máxima',
    ],
  },
];

export function ServiciosPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Encabezado */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Nuestros servicios</h1>
          <div className="h-1 w-12 bg-yellow-400 rounded-full mt-2" />
          <p className="text-sm text-gray-500 mt-3 max-w-xl">
            Elige el servicio que mejor se adapte a tus necesidades.
          </p>
        </div>
      </div>

      {/* Cards de servicios */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-5">
        {servicios.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col md:flex-row gap-6 hover:border-yellow-300 hover:shadow-md transition-all"
            >
              {/* Ícono y título */}
              <div className="flex items-start gap-4 md:w-64 shrink-0">
                <div className={`${s.color} p-3 rounded-xl shrink-0`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">{s.title}</h2>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{s.desc}</p>
                  <p className="text-sm font-bold text-[#0c1f4a] mt-2">{s.precio}</p>
                </div>
              </div>

              {/* Divisor */}
              <div className="hidden md:block w-px bg-gray-200 shrink-0" />

              {/* Features */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {s.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-yellow-500 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center shrink-0">
                <Link
                  to="/envios"
                  className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-[#0c1f4a] px-4 py-2.5 rounded-lg font-bold text-sm transition-colors whitespace-nowrap"
                >
                  Enviar <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}