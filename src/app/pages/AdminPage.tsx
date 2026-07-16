import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, CalendarDays, LogOut, Phone, Plus, X } from 'lucide-react';

interface Reserva {
  id: number;
  codigo: string;
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  cancha: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'expirada';
  created_at: string;
}

const estadoStyles: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-700',
  confirmada: 'bg-green-100 text-green-700',
  cancelada: 'bg-red-100 text-red-700',
  expirada: 'bg-gray-200 text-gray-500',
};

const horariosDisponibles = [
  '6:00 AM – 3:00 PM',
  '4:00 PM – 6:00 PM',
  '7:00 PM – 12:00 AM',
];

const canchasDisponibles = [
  'Cancha 1', 'Cancha 2', 'Cancha 3', 'Cancha 4', 'Cancha 5',
  'Cancha 6', 'Cancha 7', 'Cancha 8', 'Cancha 9',
];

export function AdminPage() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = sessionStorage.getItem('admin_token');

  // ── Estado del modal de nueva reserva manual ──
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevaReserva, setNuevaReserva] = useState({
    nombre: '', telefono: '', fecha: '', hora: '', cancha: '',
  });
  const [errorModal, setErrorModal] = useState('');
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    cargarReservas();
  }, []);

  // PROMESA — obtener reservas
  const fetchReservas = (): Promise<Reserva[]> => {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3001/api/admin/reservas', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            reject('Sesión expirada. Vuelve a iniciar sesión.');
            return;
          }
          return res.json();
        })
        .then((data) => data && resolve(data))
        .catch(() => reject('No se pudieron cargar las reservas.'));
    });
  };

  // ASYNC — carga inicial
  const cargarReservas = async () => {
    setLoading(true);
    try {
      const data = await fetchReservas();
      setReservas(data);
    } catch (err) {
      setError(err as string);
      if (err === 'Sesión expirada. Vuelve a iniciar sesión.') {
        sessionStorage.removeItem('admin_token');
        setTimeout(() => navigate('/admin/login'), 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  // PROMESA — cambiar estado
  const actualizarEstado = (id: number, estado: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3001/api/admin/reservas/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado }),
      })
        .then((res) => (res.ok ? resolve() : reject('No se pudo actualizar el estado.')))
        .catch(() => reject('Error de conexión al actualizar.'));
    });
  };

  // ASYNC — consume la promesa de actualizar
  const handleEstadoChange = async (id: number, estado: string) => {
    try {
      await actualizarEstado(id, estado);
      setReservas((prev) =>
        prev.map((r) => (r.id === id ? { ...r, estado: estado as Reserva['estado'] } : r))
      );
    } catch (err) {
      setError(err as string);
    }
  };

  // PROMESA — eliminar reserva
  const eliminarReserva = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3001/api/admin/reservas/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? resolve() : reject('No se pudo eliminar la reserva.')))
        .catch(() => reject('Error de conexión al eliminar.'));
    });
  };

  // ASYNC — consume la promesa de eliminar
  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta reserva? Esta acción no se puede deshacer.')) return;
    try {
      await eliminarReserva(id);
      setReservas((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err as string);
    }
  };

  // PROMESA — crear reserva manual (walk-in)
  const crearReservaManual = (datos: typeof nuevaReserva): Promise<Reserva> => {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3001/api/admin/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datos),
      })
        .then((res) => res.json().then((data) => ({ status: res.status, data })))
        .then(({ status, data }) => {
          if (status !== 201) {
            reject(data.error || 'No se pudo crear la reserva.');
            return;
          }
          resolve({ ...datos, id: data.id, codigo: data.codigo, estado: 'confirmada', created_at: new Date().toISOString() });
        })
        .catch(() => reject('Error de conexión al crear la reserva.'));
    });
  };

  // ASYNC — consume la promesa de crear reserva manual
  const handleCrearManual = async () => {
    setErrorModal('');

    if (!nuevaReserva.nombre || !nuevaReserva.telefono || !nuevaReserva.fecha || !nuevaReserva.hora || !nuevaReserva.cancha) {
      setErrorModal('Todos los campos son obligatorios.');
      return;
    }

    setGuardando(true);
    try {
      const creada = await crearReservaManual(nuevaReserva);
      setReservas((prev) => [creada, ...prev]);
      setModalAbierto(false);
      setNuevaReserva({ nombre: '', telefono: '', fecha: '', hora: '', cancha: '' });
    } catch (err) {
      setErrorModal(err as string);
    } finally {
      setGuardando(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Encabezado */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-[#295868]" />
              Reservas
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{reservas.length} reservas totales</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalAbierto(true)}
              className="flex items-center gap-1.5 bg-[#ec5c26] hover:bg-[#d54f1c] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nueva reserva</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl mb-4">{error}</p>
        )}

        {loading ? (
          <p className="text-center text-gray-400 py-12">Cargando reservas...</p>
        ) : reservas.length === 0 ? (
          <p className="text-center text-gray-400 py-12">No hay reservas todavía.</p>
        ) : (
          <>
            {/* Vista tabla — desktop */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold">Cliente</th>
                    <th className="text-left px-5 py-3 font-semibold">Teléfono</th>
                    <th className="text-left px-5 py-3 font-semibold">Fecha</th>
                    <th className="text-left px-5 py-3 font-semibold">Hora</th>
                    <th className="text-left px-5 py-3 font-semibold">Cancha</th>
                    <th className="text-left px-5 py-3 font-semibold">Código</th>
                    <th className="text-left px-5 py-3 font-semibold">Estado</th>
                    <th className="text-right px-5 py-3 font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {reservas.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/50">
                      <td className="px-5 py-3 font-medium text-gray-900">{r.nombre}</td>
                      <td className="px-5 py-3 text-gray-500">{r.telefono}</td>
                      <td className="px-5 py-3 text-gray-500">{r.fecha}</td>
                      <td className="px-5 py-3 text-gray-500">{r.hora}</td>
                      <td className="px-5 py-3 text-gray-500">{r.cancha}</td>
                      <td className="px-5 py-3 font-mono text-xs text-gray-400">{r.codigo}</td>
                      <td className="px-5 py-3">
                        <select
                          value={r.estado}
                          onChange={(e) => handleEstadoChange(r.id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-full border-0 cursor-pointer ${estadoStyles[r.estado]}`}
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="confirmada">Confirmada</option>
                          <option value="cancelada">Cancelada</option>
                          <option value="expirada">Expirada</option>
                        </select>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1.5"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Vista cards — mobile */}
            <div className="md:hidden space-y-3">
              {reservas.map((r) => (
                <div key={r.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{r.nombre}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Phone className="h-3 w-3" />
                        {r.telefono}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                    <div>
                      <p className="text-gray-400">Fecha</p>
                      <p className="font-medium text-gray-900">{r.fecha}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Hora</p>
                      <p className="font-medium text-gray-900">{r.hora}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Cancha</p>
                      <p className="font-medium text-gray-900">{r.cancha}</p>
                    </div>
                  </div>

                  <select
                    value={r.estado}
                    onChange={(e) => handleEstadoChange(r.id, e.target.value)}
                    className={`w-full text-xs font-semibold px-3 py-2 rounded-lg border-0 cursor-pointer ${estadoStyles[r.estado]}`}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmada">Confirmada</option>
                    <option value="cancelada">Cancelada</option>
                    <option value="expirada">Expirada</option>
                  </select>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal — nueva reserva manual */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">Nueva reserva manual</h2>
              <button onClick={() => setModalAbierto(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Nombre</label>
                <input
                  type="text"
                  value={nuevaReserva.nombre}
                  onChange={(e) => setNuevaReserva({ ...nuevaReserva, nombre: e.target.value })}
                  placeholder="Nombre del cliente"
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9cbe46]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Teléfono</label>
                <input
                  type="tel"
                  value={nuevaReserva.telefono}
                  onChange={(e) => {
                    const soloNumeros = e.target.value.replace(/\D/g, '');
                    if (soloNumeros.length <= 10) setNuevaReserva({ ...nuevaReserva, telefono: soloNumeros });
                  }}
                  placeholder="6531234567"
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9cbe46]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Fecha</label>
                <input
                  type="date"
                  value={nuevaReserva.fecha}
                  onChange={(e) => setNuevaReserva({ ...nuevaReserva, fecha: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9cbe46]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Horario</label>
                <select
                  value={nuevaReserva.hora}
                  onChange={(e) => setNuevaReserva({ ...nuevaReserva, hora: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9cbe46]"
                >
                  <option value="">Selecciona un horario</option>
                  {horariosDisponibles.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Cancha</label>
                <select
                  value={nuevaReserva.cancha}
                  onChange={(e) => setNuevaReserva({ ...nuevaReserva, cancha: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9cbe46]"
                >
                  <option value="">Selecciona una cancha</option>
                  {canchasDisponibles.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {errorModal && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{errorModal}</p>
              )}

              <button
                onClick={handleCrearManual}
                disabled={guardando}
                className="w-full bg-[#8DC63F] hover:bg-[#7db535] disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                {guardando ? 'Guardando...' : 'Registrar reserva'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}