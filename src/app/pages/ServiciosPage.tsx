import { Link } from 'react-router-dom';
import {
  CalendarDays, GraduationCap, UtensilsCrossed, GlassWater, ArrowRight,
  Wifi, Coffee, ShoppingBag, Shirt, Lock, Car, Baby, Accessibility,
} from 'lucide-react';
import BorderGlow from '../components/ui/BorderGlow';

const servicios = [
  {
    titulo: 'Canchas de pádel',
    descripcion: '9 canchas de primer nivel con iluminación nocturna y horarios flexibles todos los días.',
    cta: { label: 'Reservar cancha', to: '/reservar' },
    image: '/complex.avif',
  },
  {
    titulo: 'Clases y coaching',
    descripcion: 'Todos los niveles, instructores certificados. Primera clase gratis para nuevos alumnos.',
    cta: { label: 'Ver horarios de clases', to: '/clases' },
    image: 'https://images.unsplash.com/photo-1715333157357-a8e4acdd7992?w=900&h=700&fit=crop&auto=format',
  },
  {
    titulo: 'La Terraza',
    descripcion: 'Restaurant & bar con vista a las canchas. Antes o después de tu partido.',
    cta: { label: 'Ver menú', to: '/servicios' },
    image: '/burgir2.png',
  },
  {
    titulo: 'Super Juice',
    descripcion: 'Jugos naturales, smoothies y snacks saludables para recargar energía.',
    cta: { label: 'Ver opciones', to: '/servicios' },
    image: '/superjuice2.png',
  },
];

const categorias = [
  {
    nombre: 'Alimentos y bebidas',
    color: '#ec5c26',
    items: [
      { icon: UtensilsCrossed, label: 'Restaurant & Bar La Terraza' },
      { icon: GlassWater, label: 'Snack Bar Super Juice' },
      { icon: Coffee, label: 'Cafetería' },
    ],
  },
  {
    nombre: 'Comodidades',
    color: '#295868',
    items: [
      { icon: Shirt, label: 'Vestidores' },
      { icon: Lock, label: 'Lockers' },
      { icon: Wifi, label: 'WiFi' },
      { icon: CalendarDays, label: 'Renta de equipo' },
      { icon: ShoppingBag, label: 'Tienda deportiva' },
    ],
  },
  {
    nombre: 'Accesibilidad y familia',
    color: '#9cbe46',
    items: [
      { icon: Car, label: 'Estacionamiento gratuito' },
      { icon: Baby, label: 'Área infantil' },
      { icon: Accessibility, label: 'Acceso para personas con discapacidad' },
    ],
  },
];

export function ServiciosPage() {
  return (
    <div className="bg-[#f6f7f9]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Encabezado */}
      <div className="px-6 pt-20 pb-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9cbe46] mb-3">
            Riú Padel Complex
          </p>
          <h1 className="text-5xl md:text-6xl font-light text-[#0c0d0f] leading-[1.05] tracking-tight">
            Nuestros <span className="font-semibold">servicios</span>
          </h1>
          <p className="text-base text-gray-500 mt-5 max-w-md font-light leading-relaxed">
            Todo lo que necesitas para enfocarte en tu mejor juego, mientras nosotros nos enfocamos del resto.
          </p>
        </div>
      </div>

      {/* Servicios principales — cards con foto, mismo lenguaje visual que el Home */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 gap-4">
          {servicios.map(({ titulo, descripcion, cta, image }) => (
            <Link
              key={titulo}
              to={cta.to}
              className="group relative rounded-[22px] overflow-hidden block"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src={image}
                alt={titulo}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7">
                <h3 className="text-2xl font-semibold text-white leading-tight mb-2">{titulo}</h3>
                <p className="text-sm text-white/70 mb-4 font-light max-w-xs">{descripcion}</p>
                <span className="inline-flex items-center gap-1.5 text-white/90 text-xs font-semibold group-hover:text-[#c4dc84] transition-colors duration-200">
                  {cta.label} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Instalaciones — agrupadas por categoría, con más aire */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#295868] mb-3 text-center">
            En el complejo
          </p>
          

          <div className="space-y-14">
            {categorias.map(({ nombre, color, items }) => (
              <div key={nombre}>
                <h3
                  className="text-xs font-semibold uppercase tracking-widest mb-5"
                  style={{ color }}
                >
                  {nombre}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {items.map(({ icon: Icon, label }) => (
                    <BorderGlow
                      key={label}
                      backgroundColor="#f6f7f9"
                      borderRadius={18}
                      glowRadius={35}
                      glowIntensity={2.2}
                      edgeSensitivity={10}
                      coneSpread={35}
                      colors={[color, color, color]}
                      className="p-5 h-full"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${color}1A` }}
                        >
                          <Icon className="h-5 w-5" style={{ color }} />
                        </div>
                        <p className="text-sm font-medium text-gray-700 leading-tight">{label}</p>
                      </div>
                    </BorderGlow>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA final */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-[#295868] rounded-[28px] p-10 md:p-14 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-center sm:text-left">
            <h3 className="text-3xl font-light text-white leading-tight">
              ¿Listo para <span className="font-semibold">jugar?</span>
            </h3>
            <p className="text-white/60 text-sm mt-2 font-light">Reserva tu cancha en menos de un minuto.</p>
          </div>
          <Link
            to="/reservar"
            className="flex items-center gap-2 bg-[#ec5c26] hover:bg-[#d54f1c] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors shadow-lg whitespace-nowrap"
          >
            Reservar cancha
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}