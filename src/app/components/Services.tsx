import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const servicios = [
  { num: 'Canchas de pádel',     desc: 'Infraestructura de primer nivel disponible todos los días de la semana.' },
  { num: 'Clases y coaching',    desc: 'Instructores certificados para todos los niveles. Primera clase gratis.' },
  { num: 'Restaurant & Bar',     desc: 'La Terraza y Super Juice, para recargar energías antes o después de jugar.' },
];

export function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Todo lo que necesitas para jugar
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Imagen izquierda */}
          <div className="relative rounded-2xl overflow-hidden h-80 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=800"
              alt="Canchas Riú Padel Complex"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-[#2D6E7E]/85 px-5 py-3">
              <p className="text-white text-sm font-medium">
                Riú Padel Complex — Av. Carranza y 45, San Luis Río Colorado
              </p>
            </div>
          </div>

          {/* Servicios derecha */}
          <div className="space-y-6">
            {servicios.map(({ num, desc }) => (
              <div key={num} className="flex items-start gap-4 border-l-4 border-[#8DC63F] pl-4">
                <div>
                  <p className="text-xl font-extrabold text-gray-900">{num}</p>
                  <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}

            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 mt-4 bg-[#8DC63F] hover:bg-[#7db535] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors"
            >
              Ver todos los servicios <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}