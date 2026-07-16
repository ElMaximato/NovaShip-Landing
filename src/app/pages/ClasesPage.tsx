import { Link } from 'react-router-dom';
import { GraduationCap, Users, Sparkles, Timer, ExternalLink } from 'lucide-react';

const tiposClase = [
  {
    icon: GraduationCap,
    titulo: 'Clases para principiantes',
    descripcion: 'Aprende los fundamentos del pádel desde cero, en un ambiente relajado y sin presión.',
  },
  {
    icon: Users,
    titulo: 'Entrenamientos grupales',
    descripcion: 'Mejora tu juego en equipo con sesiones diseñadas para practicar en grupo.',
  },
  {
    icon: Sparkles,
    titulo: 'Clínicas',
    descripcion: 'Sesiones enfocadas en técnica y estrategia para llevar tu nivel más allá.',
  },
  {
    icon: Timer,
    titulo: 'Entrenamientos de 60 minutos',
    descripcion: 'Sesiones individuales o en pareja de una hora, a tu ritmo.',
  },
];

const entrenadoras = [
  {
    nombre: 'Melissa Flores',
    foto: '/meli.jpg', // reemplaza con la ruta real de la foto
  },
  {
    nombre: 'Melissa Pérez',
    foto: '/melip.jpg', // reemplaza con la ruta real de la foto
  },
];

export function ClasesPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Encabezado */}
      <div className="bg-white border-b border-gray-200 px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#9cbe46] font-semibold text-xs uppercase tracking-widest mb-2">
            Academia Riú Padel
          </p>
          <h1 className="text-3xl font-bold text-gray-900">Clases y entrenamientos</h1>
          <div className="h-1 w-12 bg-[#9cbe46] rounded-full mt-3" />
          <p className="text-sm text-gray-500 mt-4 max-w-xl">
            Contamos con academia de pádel para todos los niveles, desde tus primeros pasos hasta perfeccionar tu técnica.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">

        {/* Tipos de clase */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Tipos de clase
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tiposClase.map(({ icon: Icon, titulo, descripcion }) => (
              <div
                key={titulo}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-[#9cbe4614] flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-[#9cbe46]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{titulo}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Entrenadoras */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Nuestras entrenadoras
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {entrenadoras.map(({ nombre, foto }) => (
              <div
                key={nombre}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <img
                  src={foto}
                  alt={nombre}
                  className="w-full h-56 object-cover object-top"
                />
                <div className="p-4">
                  <p className="text-sm font-bold text-gray-900">{nombre}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Entrenadora certificada</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}