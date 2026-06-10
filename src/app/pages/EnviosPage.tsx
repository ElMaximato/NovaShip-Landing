import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Package, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

// ── TIPOS ──────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4 | 5;

const STEPS = [
  { id: 1, label: 'Detalles del envío'   },
  { id: 2, label: 'Selección de servicio'},
  { id: 3, label: 'Detalles adicionales' },
  { id: 4, label: 'Pago'                 },
  { id: 5, label: 'Confirmación'         },
];

const estadosMexico = [
  'Aguascalientes','Baja California','Baja California Sur','Campeche',
  'Chiapas','Chihuahua','Ciudad de México','Coahuila','Colima',
  'Durango','Guanajuato','Guerrero','Hidalgo','Jalisco','México',
  'Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla',
  'Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora',
  'Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas',
];

const tiposPaquete = [
  { id: 'sobre',   label: 'Sobre',        desc: 'Hasta 0.5 kg',   icon: '✉️' },
  { id: 'pequeña', label: 'Caja pequeña', desc: 'Hasta 5 kg',     icon: '📦' },
  { id: 'mediana', label: 'Caja mediana', desc: 'Hasta 20 kg',    icon: '📦' },
  { id: 'grande',  label: 'Caja grande',  desc: 'Hasta 50 kg',    icon: '📦' },
];

const servicios = [
  { id: 'express',    label: 'Express',           desc: 'Entrega en 1 día hábil',    precio: '$299',  badge: 'Más rápido' },
  { id: 'estandar',   label: 'Estándar',          desc: 'Entrega en 2-3 días hábiles',precio: '$149', badge: ''           },
  { id: 'economico',  label: 'Económico',         desc: 'Entrega en 5-7 días hábiles',precio: '$89',  badge: 'Más barato' },
];

const contenidos = [
  'Documentos','Ropa y textiles','Electrónicos',
  'Artículo frágil','Alimentos','Otro',
];

// ── COMPONENTES REUTILIZABLES ──────────────────────────
function Campo({ label, placeholder, type = 'text', required = false }: {
  label: string; placeholder: string; type?: string; required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
      />
    </div>
  );
}

function Select({ label, required = false }: { label: string; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select className="w-full appearance-none px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition bg-white">
          <option value="">Selecciona un estado</option>
          {estadosMexico.map(e => <option key={e}>{e}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function SeccionDireccion({ titulo }: { titulo: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 className="text-base font-bold text-gray-900">{titulo}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Campo label="Nombre completo"  placeholder="Juan Pérez García"   required />
        <Campo label="Teléfono"         placeholder="55 1234 5678"         required />
      </div>
      <Campo label="Correo electrónico" placeholder="juan@correo.com" type="email" required />
      <Campo label="Dirección"          placeholder="Av. Insurgentes Sur 123"       required />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Campo label="Colonia"    placeholder="Del Valle"    required />
        <Campo label="C.P."       placeholder="03100"        required />
        <Select label="Estado"    required />
      </div>
      <Campo label="Ciudad / Municipio" placeholder="Benito Juárez" required />
      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
        <input type="checkbox" className="accent-yellow-400 h-4 w-4" />
        Recibir notificaciones de estado por correo
      </label>
    </div>
  );
}

// ── STEPS ─────────────────────────────────────────────
function Step1() {
  const [tipoPaquete, setTipoPaquete] = useState('');
  return (
    <div className="space-y-5">
      <SeccionDireccion titulo="Enviar desde" />
      <SeccionDireccion titulo="Enviar a" />

      {/* Tipo de paquete */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-base font-bold text-gray-900">Tipo de paquete</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tiposPaquete.map(tp => (
            <button
              key={tp.id}
              onClick={() => setTipoPaquete(tp.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center ${
                tipoPaquete === tp.id
                  ? 'border-yellow-400 bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <span className="text-2xl">{tp.icon}</span>
              <span className={`text-sm font-semibold ${tipoPaquete === tp.id ? 'text-[#0c1f4a]' : 'text-gray-700'}`}>
                {tp.label}
              </span>
              <span className="text-xs text-gray-400">{tp.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step2() {
  const [servicio, setServicio] = useState('estandar');
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 className="text-base font-bold text-gray-900">Selecciona tu servicio</h2>
      <div className="space-y-3">
        {servicios.map(s => (
          <button
            key={s.id}
            onClick={() => setServicio(s.id)}
            className={`w-full flex items-center justify-between p-5 rounded-xl border-2 transition-all text-left ${
              servicio === s.id
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                servicio === s.id ? 'border-yellow-400' : 'border-gray-300'
              }`}>
                {servicio === s.id && <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />}
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
            <span className={`text-base font-bold ${servicio === s.id ? 'text-[#0c1f4a]' : 'text-gray-400'}`}>
              {s.precio}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step3() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 className="text-base font-bold text-gray-900">Detalles adicionales</h2>

      {/* Contenido */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Contenido del paquete <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select className="w-full appearance-none px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition bg-white">
            <option value="">Selecciona una opción</option>
            {contenidos.map(c => <option key={c}>{c}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Valor declarado */}
      <Campo label="Valor declarado (MXN)" placeholder="Ej: 500.00" type="number" />

      {/* Instrucciones */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Instrucciones de entrega
        </label>
        <textarea
          rows={3}
          placeholder="Ej: Dejar con el vecino si no hay nadie en casa..."
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition resize-none"
        />
      </div>

      {/* Seguro */}
      <label className="flex items-start gap-3 cursor-pointer p-4 bg-blue-50 rounded-lg border border-blue-100">
        <input type="checkbox" className="accent-yellow-400 h-4 w-4 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-gray-800">Agregar seguro al envío</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Protege tu paquete en caso de pérdida o daño. Costo adicional según valor declarado.
          </p>
        </div>
      </label>
    </div>
  );
}

function Step4() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
      <h2 className="text-base font-bold text-gray-900">Información de pago</h2>

      <Campo label="Nombre en la tarjeta" placeholder="Juan Pérez García" required />

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Número de tarjeta <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Campo label="Fecha de vencimiento" placeholder="MM / AA" required />
        <Campo label="CVV"                  placeholder="123"     required />
      </div>

      {/* Resumen */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Resumen del cobro</h3>
        {[
          { label: 'Servicio Estándar', valor: '$149.00' },
          { label: 'Seguro básico',     valor: '$25.00'  },
          { label: 'IVA (16%)',         valor: '$27.84'  },
        ].map(({ label, valor }) => (
          <div key={label} className="flex justify-between text-sm text-gray-600">
            <span>{label}</span>
            <span>{valor}</span>
          </div>
        ))}
        <div className="border-t border-gray-300 pt-2 flex justify-between text-sm font-bold text-gray-900">
          <span>Total</span>
          <span>$201.84 MXN</span>
        </div>
      </div>
    </div>
  );
}

function Step5() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center text-center space-y-4">
      <div className="bg-green-100 p-4 rounded-full">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900">¡Envío creado con éxito!</h2>
      <p className="text-sm text-gray-500 max-w-sm">
        Tu guía ha sido generada. Recibirás un correo con los detalles y el código de rastreo.
      </p>

      {/* Guía generada */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-8 py-4 w-full max-w-xs">
        <p className="text-xs text-gray-400 mb-1">NÚMERO DE GUÍA</p>
        <p className="text-xl font-bold text-[#0c1f4a] tracking-wider">NS-2026-48291</p>
      </div>

      <div className="flex flex-wrap gap-3 pt-2 justify-center">
        <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-[#0c1f4a] px-5 py-2.5 rounded-lg font-bold text-sm transition-colors">
          <Package className="h-4 w-4" />
          Descargar guía
        </button>
        <Link
          to="/rastreo"
          className="flex items-center gap-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          Rastrear envío <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

// ── PÁGINA PRINCIPAL ───────────────────────────────────
export function EnviosPage() {
  const [step, setStep] = useState<Step>(1);

  const siguiente = () => setStep(prev => Math.min(prev + 1, 5) as Step);
  const anterior  = () => setStep(prev => Math.max(prev - 1, 1) as Step);

  const labelBoton = () => {
    if (step === 4) return 'Confirmar y pagar';
    if (step === 5) return null;
    return 'Continuar';
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Encabezado */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Crear un envío</h1>
          <div className="h-1 w-12 bg-yellow-400 rounded-full mt-2" />
          <p className="text-xs text-gray-400 mt-3">
            <span className="text-red-500">*</span> Indica un campo obligatorio
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-8 items-start">

          {/* ── SIDEBAR DE PROGRESO ── */}
          <aside className="hidden md:block w-52 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
              <ul className="space-y-0">
                {STEPS.map((s, index) => {
                  const done    = step > s.id;
                  const active  = step === s.id;
                  const isLast  = index === STEPS.length - 1;

                  return (
                    <li key={s.id} className="flex gap-3">
                      {/* Línea + punto */}
                      <div className="flex flex-col items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 text-xs font-bold transition-all ${
                          done
                            ? 'bg-[#0c1f4a] border-[#0c1f4a] text-white'
                            : active
                              ? 'bg-yellow-400 border-yellow-400 text-[#0c1f4a]'
                              : 'bg-white border-gray-300 text-gray-400'
                        }`}>
                          {done ? '✓' : s.id}
                        </div>
                        {!isLast && (
                          <div className={`w-0.5 h-8 mt-1 ${done ? 'bg-[#0c1f4a]' : 'bg-gray-200'}`} />
                        )}
                      </div>

                      {/* Label */}
                      <div className="pb-8">
                        <p className={`text-xs leading-tight mt-0.5 ${
                          active ? 'font-bold text-[#0c1f4a]' : done ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {s.label}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* ── CONTENIDO DEL STEP ── */}
          <div className="flex-1 space-y-5">

            {/* Paso móvil */}
            <div className="md:hidden text-xs text-gray-400 font-medium">
              Paso {step} de {STEPS.length} — <span className="text-[#0c1f4a] font-semibold">{STEPS[step - 1].label}</span>
            </div>

            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
            {step === 5 && <Step5 />}

            {/* Botones de navegación */}
            {step < 5 && (
              <div className="flex justify-between pt-2">
                <button
                  onClick={anterior}
                  disabled={step === 1}
                  className="flex items-center gap-2 border border-gray-300 text-gray-600 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Regresar
                </button>
                <button
                  onClick={siguiente}
                  className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-[#0c1f4a] px-6 py-2.5 rounded-lg font-bold text-sm transition-colors"
                >
                  {labelBoton()}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}