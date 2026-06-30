import { useState } from 'react';
import { CalendarDays, Clock, User, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';


// promesa 1 - valida campos del formulario

function validarCampos(datos: {
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  cancha: string;
}): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!datos.nombre || datos.nombre.length < 10) {
        reject('El nombre debe tener al menos 10 caracteres.');
        return;
      }
      if (!datos.telefono || datos.telefono.length !== 10) {
        reject('El teléfono debe tener exactamente 10 dígitos.');
        return;
      }
      if (!datos.fecha) {
        reject('Selecciona una fecha para tu reserva.');
        return;
      }
      if (!datos.hora) {
        reject('Selecciona un horario disponible.');
        return;
      }
      if (!datos.cancha) {
        reject('Selecciona una cancha.');
        return;
      }
      resolve(true);
    }, 800);
  });
}


// funcionn async 1 — Ejecuta validación

const ejecutarValidacion = async (datos: {
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  cancha: string;
}) => {
  const resultado = await validarCampos(datos);
  return resultado;
};


// promesa 2 - construir msj whatsapp

function construirMensaje(datos: {
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  cancha: string;
}): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!datos.nombre || !datos.telefono || !datos.fecha) {
        reject('Datos incompletos para construir el mensaje.');
        return;
      }
      const mensaje =
        `Hola, quiero reservar una cancha en Riú Padel Complex 🎾\n\n` +
        `👤 Nombre: ${datos.nombre}\n` +
        `📞 Teléfono: ${datos.telefono}\n` +
        `📅 Fecha: ${datos.fecha}\n` +
        `🕐 Horario: ${datos.hora}\n` +
        `🏟️ Cancha: ${datos.cancha}`;
      resolve(mensaje);
    }, 500);
  });
}


// function async 2 — construye y abre whatsapp

const enviarWhatsApp = async (datos: {
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  cancha: string;
}) => {
  const mensaje = await construirMensaje(datos);
  const url = `https://wa.me/526533015976?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
  return mensaje;
};


// promesa 3 — guardar reserva en BD

function guardarEnBD(datos: {
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  cancha: string;
}): Promise<number> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3001/api/reservas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) { reject(data.error); return; }
        resolve(data.id);
      })
      .catch(() => reject('Error de conexión con el servidor.'));
  });
}


// function async 3 — ejecuta guardado en BD

const ejecutarGuardado = async (datos: {
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  cancha: string;
}) => {
  const id = await guardarEnBD(datos);
  console.log(`Reserva guardada con ID: ${id}`);
  return id;
};

// ── HORARIOS ────────────────────────────────────────────────
const horarios = [
  { id: '6am-3pm',  label: '6:00 AM – 3:00 PM',  precio: '2x1 la hora',  color: 'bg-[#E8511A]' },
  { id: '4pm-6pm',  label: '4:00 PM – 6:00 PM',  precio: '$400 la hora', color: 'bg-[#2D6E7E]' },
  { id: '7pm-12am', label: '7:00 PM – 12:00 AM', precio: '$500 la hora', color: 'bg-[#1a4d5a]' },
];

const canchas = ['Cancha 1', 'Cancha 2', 'Cancha 3', 'Cancha 4'];

// ── COMPONENTE PRINCIPAL ────────────────────────────────────
export function ReservarPage() {
  const [nombre,   setNombre]   = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha,    setFecha]    = useState('');
  const [hora,     setHora]     = useState('');
  const [cancha,   setCancha]   = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [exito,    setExito]    = useState(false);
  const [idReserva, setIdReserva] = useState<number | null>(null);

  const hoy      = new Date().toISOString().split('T')[0];
  const finDeAño = `${new Date().getFullYear()}-12-31`;

  // ═══════════════════════════════════════════
  // FUNCIÓN PRINCIPAL — Orquesta todo el flujo
  // ═══════════════════════════════════════════
  const handleReservar = async () => {
    setError('');
    setExito(false);
    setLoading(true);

    try {
      // Async 1 — Valida los campos
      await ejecutarValidacion({ nombre, telefono, fecha, hora, cancha });

      // Async 2 — Construye y envía por WhatsApp
      await enviarWhatsApp({ nombre, telefono, fecha, hora, cancha });

      // Async 3 — Guarda en la BD
      const id = await ejecutarGuardado({ nombre, telefono, fecha, hora, cancha });
      setIdReserva(id);

      setExito(true);

    } catch (errorMsg) {
      setError(errorMsg as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Encabezado */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Reservar cancha</h1>
          <div className="h-1 w-12 bg-[#8DC63F] rounded-full mt-2" />
          <p className="text-sm text-gray-500 mt-3">
            Completa el formulario y te contactaremos por WhatsApp para confirmar tu reserva.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-5">

        {/* Datos personales */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Tus datos</h2>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={nombre}
                onChange={e => {
                  if (e.target.value.length <= 60) setNombre(e.target.value);
                }}
                placeholder="Fernando Velazquez"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8DC63F] focus:border-[#8DC63F] transition"
              />
            </div>
            <p className={`text-xs mt-1 text-right ${nombre.length < 10 && nombre.length > 0 ? 'text-red-400' : 'text-gray-400'}`}>
              {nombre.length}/60 caracteres {nombre.length < 10 && nombre.length > 0 ? '— mínimo 10' : ''}
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Teléfono <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                value={telefono}
                onChange={e => {
                  const soloNumeros = e.target.value.replace(/\D/g, '');
                  if (soloNumeros.length <= 10) setTelefono(soloNumeros);
                }}
                placeholder="6531234567"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8DC63F] focus:border-[#8DC63F] transition"
              />
            </div>
            <p className={`text-xs mt-1 text-right ${telefono.length > 0 && telefono.length < 10 ? 'text-red-400' : 'text-gray-400'}`}>
              {telefono.length}/10 dígitos
            </p>
          </div>
        </div>

        {/* Fecha */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Fecha</h2>
          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={fecha}
              min={hoy}
              max={finDeAño}
              onKeyDown={e => e.preventDefault()}
              onChange={e => {
                const seleccionada = e.target.value;
                if (seleccionada > finDeAño)     setFecha(finDeAño);
                else if (seleccionada < hoy)     setFecha(hoy);
                else                             setFecha(seleccionada);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8DC63F] focus:border-[#8DC63F] transition"
            />
          </div>
          <p className="text-xs text-gray-400">
            Solo puedes reservar desde hoy hasta el 31 de diciembre de {new Date().getFullYear()}.
          </p>
        </div>

        {/* Horario */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Horario</h2>
          <div className="space-y-3">
            {horarios.map(h => (
              <button
                key={h.id}
                onClick={() => setHora(h.label)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                  hora === h.label
                    ? 'border-[#8DC63F] bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${hora === h.label ? 'border-[#8DC63F]' : 'border-gray-300'}`}>
                    {hora === h.label && <div className="w-2.5 h-2.5 rounded-full bg-[#8DC63F]" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-900">{h.label}</span>
                  </div>
                </div>
                <span className={`${h.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {h.precio}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Cancha */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Cancha</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {canchas.map(c => (
              <button
                key={c}
                onClick={() => setCancha(c)}
                className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                  cancha === c
                    ? 'border-[#8DC63F] bg-green-50 text-[#2D6E7E]'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Éxito */}
        {exito && (
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-green-700 font-bold">¡Reserva enviada por WhatsApp!</p>
              {idReserva && (
                <p className="text-xs text-green-600 mt-0.5">
                  Reserva registrada con ID #{idReserva} — Riú Padel Complex te confirmará a la brevedad.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Botón */}
        <button
          onClick={handleReservar}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#8DC63F] hover:bg-[#7db535] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm transition-colors shadow-sm"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Procesando reserva...
            </>
          ) : (
            <>
              <CalendarDays className="h-4 w-4" />
              Confirmar por WhatsApp
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          Al confirmar, serás redirigido a WhatsApp para completar tu reserva con Riú Padel Complex.
        </p>

      </div>
    </div>
  );
}