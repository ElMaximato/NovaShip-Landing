import { useState, useEffect } from 'react';
import { CalendarDays, Clock, User, Phone, CheckCircle2, AlertCircle, Loader2, Timer, Ban } from 'lucide-react';


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


// funcion async 1 — Ejecuta validación

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


// promesa 2 — guardar reserva en BD (ahora regresa también el código)

function guardarEnBD(datos: {
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  cancha: string;
  sitio_web: string; // honeypot
}): Promise<{ id: number; codigo: string }> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3001/api/reservas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    })
      .then(res => {
        if (res.status === 429) {
          reject('Demasiados intentos. Espera unos minutos antes de volver a intentar.');
          throw new Error('rate-limit');
        }
        return res.json().then(data => ({ status: res.status, data }));
      })
      .then(result => {
        if (!result) return;
        const { status, data } = result;
        if (data.error) {
          reject(data.error);
          return;
        }
        resolve({ id: data.id, codigo: data.codigo });
      })
      .catch(() => {}); // el reject ya se disparó arriba si aplica
  });
}


// function async 2 — ejecuta guardado en BD

const ejecutarGuardado = async (datos: {
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  cancha: string;
  sitio_web: string;
}) => {
  const resultado = await guardarEnBD(datos);
  console.log(`Reserva guardada con código: ${resultado.codigo}`);
  return resultado;
};


// promesa 3 - construir msj whatsapp (ahora incluye el código)

function construirMensaje(datos: {
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  cancha: string;
  codigo: string;
}): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!datos.nombre || !datos.telefono || !datos.fecha) {
        reject('Datos incompletos para construir el mensaje.');
        return;
      }
      const mensaje =
        `Hola, quiero confirmar mi reserva en Riú Padel Complex 🎾\n\n` +
        `🔖 Código de reserva: ${datos.codigo}\n` +
        `👤 Nombre: ${datos.nombre}\n` +
        `📞 Teléfono: ${datos.telefono}\n` +
        `📅 Fecha: ${datos.fecha}\n` +
        `🕐 Horario: ${datos.hora}\n` +
        `🏟️ Cancha: ${datos.cancha}\n\n` +
        `Sé que tengo 24 horas para presentarme y dejar un anticipo, de lo contrario mi reserva se cancelará.`;
      resolve(mensaje);
    }, 500);
  });
}


// function async 3 — construye y abre whatsapp

const enviarWhatsApp = async (datos: {
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  cancha: string;
  codigo: string;
}) => {
  const mensaje = await construirMensaje(datos);
  const url = `https://wa.me/526533015976?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
  return mensaje;
};


// promesa 4 — consultar disponibilidad de una fecha

function consultarDisponibilidad(fecha: string): Promise<{ hora: string; cancha: string }[]> {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3001/api/reservas/disponibilidad?fecha=${fecha}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) { reject(data.error); return; }
        resolve(data);
      })
      .catch(() => reject('No se pudo consultar la disponibilidad.'));
  });
}

// function async 4 — ejecuta consulta de disponibilidad

const ejecutarConsultaDisponibilidad = async (fecha: string) => {
  const ocupadas = await consultarDisponibilidad(fecha);
  return ocupadas;
};

// ── HORARIOS ────────────────────────────────────────────────
const horarios = [
  { id: '6am-3pm',  label: '6:00 AM – 3:00 PM',  precio: '2x1 la hora',  color: 'bg-[#E8511A]' },
  { id: '4pm-6pm',  label: '4:00 PM – 6:00 PM',  precio: '$400 la hora', color: 'bg-[#2D6E7E]' },
  { id: '7pm-12am', label: '7:00 PM – 12:00 AM', precio: '$500 la hora', color: 'bg-[#1a4d5a]' },
];

const canchas = ['Cancha 1', 'Cancha 2', 'Cancha 3', 'Cancha 4', 'Cancha 5', 'Cancha 6', 'Cancha 7', 'Cancha 8', 'Cancha 9'];

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
  const [codigoReserva, setCodigoReserva] = useState<string | null>(null);

  const [ocupadas, setOcupadas] = useState<{ hora: string; cancha: string }[]>([]);
  const [cargandoDisponibilidad, setCargandoDisponibilidad] = useState(false);

  const hoy      = new Date().toISOString().split('T')[0];
  const finDeAño = `${new Date().getFullYear()}-12-31`;

  // Cada vez que cambia la fecha, consulta qué horarios/canchas ya están ocupados
  useEffect(() => {
    if (!fecha) {
      setOcupadas([]);
      return;
    }

    setCargandoDisponibilidad(true);
    setHora('');
    setCancha('');

    ejecutarConsultaDisponibilidad(fecha)
      .then(data => setOcupadas(data))
      .catch(() => setOcupadas([]))
      .finally(() => setCargandoDisponibilidad(false));
  }, [fecha]);

  // Verifica si un horario específico está completamente ocupado (todas las canchas)
  const horarioCompletoOcupado = (horaLabel: string) => {
    const canchasOcupadasEnHorario = ocupadas.filter(o => o.hora === horaLabel).length;
    return canchasOcupadasEnHorario >= canchas.length;
  };

  // Verifica si una cancha específica está ocupada para el horario ya elegido
  const canchaOcupada = (canchaNombre: string) => {
    if (!hora) return false;
    return ocupadas.some(o => o.hora === hora && o.cancha === canchaNombre);
  };

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

      // Async 2 — Guarda en la BD primero (aquí nace el código)
      const { codigo } = await ejecutarGuardado({
        nombre, telefono, fecha, hora, cancha,
        sitio_web: '', // honeypot, siempre vacío para usuarios reales
      });
      setCodigoReserva(codigo);

      // Async 3 — Ahora sí, construye y abre WhatsApp con el código incluido
      await enviarWhatsApp({ nombre, telefono, fecha, hora, cancha, codigo });

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

        {/* Aviso de política de reserva */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <Timer className="h-5 w-5 text-[#2D6E7E] shrink-0 mt-0.5" />
          <p className="text-sm text-[#2D6E7E]">
            Tu reserva quedará como <strong>pendiente por 15 minutos</strong>. Debes presentarte en el club dentro de las próximas <strong>24 horas</strong> para confirmar con un anticipo, de lo contrario se cancelará automáticamente.
          </p>
        </div>

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
                placeholder="Tu nombre"
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
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Horario</h2>
            {cargandoDisponibilidad && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                Consultando disponibilidad...
              </span>
            )}
          </div>

          {!fecha && (
            <p className="text-xs text-gray-400">Elige primero una fecha para ver los horarios disponibles.</p>
          )}

          <div className="space-y-3">
            {horarios.map(h => {
              const bloqueado = fecha ? horarioCompletoOcupado(h.label) : false;
              return (
                <button
                  key={h.id}
                  disabled={bloqueado}
                  onClick={() => setHora(h.label)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                    bloqueado
                      ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      : hora === h.label
                        ? 'border-[#8DC63F] bg-green-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${hora === h.label && !bloqueado ? 'border-[#8DC63F]' : 'border-gray-300'}`}>
                      {hora === h.label && !bloqueado && <div className="w-2.5 h-2.5 rounded-full bg-[#8DC63F]" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-900">{h.label}</span>
                    </div>
                  </div>
                  {bloqueado ? (
                    <span className="flex items-center gap-1 bg-gray-200 text-gray-500 text-xs font-bold px-3 py-1 rounded-full">
                      <Ban className="h-3 w-3" />
                      Sin cupo
                    </span>
                  ) : (
                    <span className={`${h.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                      {h.precio}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cancha */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Cancha</h2>
          {!hora && (
            <p className="text-xs text-gray-400">Elige un horario para ver qué canchas están libres.</p>
          )}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {canchas.map(c => {
              const bloqueada = canchaOcupada(c);
              return (
                <button
                  key={c}
                  disabled={bloqueada}
                  onClick={() => setCancha(c)}
                  className={`relative p-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                    bloqueada
                      ? 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed'
                      : cancha === c
                        ? 'border-[#8DC63F] bg-green-50 text-[#2D6E7E]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {c}
                  {bloqueada && (
                    <span className="block text-[10px] font-medium text-gray-400 mt-0.5">Ocupada</span>
                  )}
                </button>
              );
            })}
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
              <p className="text-sm text-green-700 font-bold">¡Reserva registrada!</p>
              {codigoReserva && (
                <p className="text-xs text-green-600 mt-0.5">
                  Tu código es <strong>{codigoReserva}</strong>. Tienes 15 minutos como pendiente y 24 horas para presentarte y confirmar con anticipo.
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