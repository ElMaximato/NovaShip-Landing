import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

const actionCards = [
  {
    tag: 'Canchas',
    title: 'Reservar\ncancha',
    description: 'Elige tu horario y confirma en segundos.',
    cta: 'Reservar ahora',
    href: '/reservar',
    image: '/complex.avif',
  },
  {
    tag: 'Clases',
    title: 'Tomar\nclases',
    description: 'Primera clase gratis. Coach certificado incluido.',
    cta: 'Ver información',
    href: '/clases',
    image: '/coach.jpg',
  },
  {
    tag: 'Torneos',
    title: 'Competir',
    description: 'Inscríbete en torneos para todos los niveles.',
    cta: 'Ver torneos',
    href: '/torneos',
    image: '/padel.jpg',
  },
];

export function Services() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══════════════ ¿Qué quieres hacer hoy? ══════════════ */}
      <section className="py-24 px-4 md:px-8 bg-[#f6f7f9]">
        <div className="max-w-[1350px] mx-auto">

          <div className="mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9cbe46] mb-3">
              Riú Padel Complex
            </p>
            <h2 className="text-5xl md:text-6xl font-light text-[#0c0d0f] leading-[1.05] tracking-tight">
              ¿Qué quieres<br /><span className="font-semibold">hacer hoy?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[320px] md:auto-rows-[320px]">

            <Link
              to={actionCards[0].href}
              className="group relative rounded-[22px] overflow-hidden md:row-span-2 block"
            >
              <img
                src={actionCards[0].image}
                alt="Reservar cancha"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <span className="inline-block text-[10px] font-semibold tracking-[0.14em] uppercase text-white/60 mb-2">
                  {actionCards[0].tag}
                </span>
                <h3 className="text-3xl font-semibold text-white leading-tight mb-1 whitespace-pre-line">
                  {actionCards[0].title}
                </h3>
                <p className="text-sm text-white/70 mb-5 font-light">{actionCards[0].description}</p>
                <span className="inline-flex items-center gap-2 bg-[#9cbe46] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 group-hover:bg-[#89ab3c] group-hover:gap-3">
                  {actionCards[0].cta} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>

            {actionCards.slice(1).map((card, i) => (
              <Link key={i} to={card.href} className="group relative rounded-[22px] overflow-hidden block">
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block text-[10px] font-semibold tracking-[0.14em] uppercase text-white/60 mb-1.5">
                    {card.tag}
                  </span>
                  <h3 className="text-2xl font-semibold text-white leading-tight mb-1 whitespace-pre-line">
                    {card.title}
                  </h3>
                  <p className="text-xs text-white/70 mb-4 font-light">{card.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-white/90 text-xs font-semibold group-hover:text-[#c4dc84] transition-colors duration-200">
                    {card.cta} <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ Banner flashy hacia /servicios — un solo bloque, sin detalle ══════════════ */}
      <section className="px-4 md:px-8 pb-6">
        <div className="max-w-[1350px] mx-auto">
          <Link
            to="/servicios"
            className="group relative rounded-[28px] overflow-hidden block"
            style={{ aspectRatio: '21/9' }}
          >
            <img
              src="/riu.jpg"
              alt="Servicios Riú Padel"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#295868]/90 via-[#295868]/50 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-14 max-w-xl">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c4dc84] mb-3">
                Un lugar completo
              </p>
              <h3 className="text-3xl md:text-4xl font-light text-white leading-tight mb-4">
                Servicios e <span className="font-semibold">instalaciones</span>
              </h3>
              <span className="inline-flex items-center gap-2 text-white text-sm font-semibold w-fit border-b border-white/40 pb-1 group-hover:border-[#c4dc84] group-hover:text-[#c4dc84] transition-colors duration-200">
                Descubre todo lo que ofrecemos <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}