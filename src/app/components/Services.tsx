import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const stats = [
  { num: 'Envio Nacional',  desc: 'Como referente en entregas puntuales y confiables'     },
  { num: 'Envio Internacional',     desc: 'Países y destinos con cobertura internacional'          },
  { num: 'Envio Express',    desc: 'Paquetes entregados satisfactoriamente'                 },
];

export function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Entregando lo que importa
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Imagen izquierda */}
          <div className="relative rounded-2xl overflow-hidden h-80 shadow-md">
            <img
              src="/paquetes.jpg"
              alt="Servicio NovaShip"
              className="w-full h-full object-cover"
            />
            {/* Caption inferior */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#0c1f4a]/80 px-5 py-3">
              <p className="text-white text-sm font-medium">
                Enviamos tu paquete de forma segura a cualquier destino de México y el mundo.
              </p>
            </div>
          </div>

          {/* Stats derecha */}
          <div className="space-y-6">
            {stats.map(({ num, desc }) => (
              <div key={num} className="flex items-start gap-4 border-l-4 border-yellow-400 pl-4">
                <div>
                  <p className="text-3xl font-extrabold text-gray-900">{num}</p>
                  <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}

            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 mt-4 bg-yellow-400 hover:bg-yellow-300 text-[#0c1f4a] px-5 py-2.5 rounded-lg font-bold text-sm transition-colors"
            >
              Ver todos los servicios <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}