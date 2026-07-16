import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';

// promesa 5 — Registrar usuario en el backend
function registrarUsuario(datos: {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}): Promise<number> {
  return new Promise((resolve, reject) => {

    // Nombre
    if (datos.nombre.length < 5 || datos.nombre.length > 20) {
      reject('El nombre debe tener entre 5 y 20 caracteres.');
      return;
    }

    // Apellido
    if (datos.apellido.length < 5 || datos.apellido.length > 20) {
      reject('El apellido debe tener entre 5 y 20 caracteres.');
      return;
    }

    // Email - longitud
    if (datos.email.length > 50) {
      reject('El correo no puede superar los 50 caracteres.');
      return;
    }

    // Email - dominios permitidos
    const dominiosPermitidos = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com'];
    const dominio = datos.email.split('@')[1];
    if (!dominio || !dominiosPermitidos.includes(dominio.toLowerCase())) {
      reject('Usa un correo de Gmail, Outlook, Hotmail, Yahoo o iCloud.');
      return;
    }

    // Email - formato básico
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoEmail.test(datos.email)) {
      reject('El formato del correo no es válido.');
      return;
    }

    // Password
    if (datos.password.length < 8 || datos.password.length > 20) {
      reject('La contraseña debe tener entre 8 y 20 caracteres.');
      return;
    }

    fetch('http://localhost:3001/api/auth/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) { reject(data.error); return; }
        resolve(data.id);
      })
      .catch(() => reject('No se pudo conectar con el servidor.'));
  });
}

// async 5 — Ejecuta el registro de la cuenta

const ejecutarRegistro = async (datos: {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}) => {
  const id = await registrarUsuario(datos);
  return id;
  };

  export function RegistroPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm,  setShowConfirm]  = useState(false);

  const [nombre,   setNombre]   = useState('');
  const [apellido, setApellido] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const navigate = useNavigate();

  // ═══════════════════════════════════════════
  // FUNCIÓN PRINCIPAL — Maneja el submit del registro
  // ═══════════════════════════════════════════
  const handleRegistro = async () => {
    setError('');

    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      const id = await ejecutarRegistro({ nombre, apellido, email, password });
      console.log('Cuenta creada con ID:', id);
      navigate('/login'); // Redirige al login tras registro exitoso

    } catch (errorMsg) {
      setError(errorMsg as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/logoRiu.png" alt="Riú Padel Complex" className="h-12 w-auto mx-auto" />
          </Link>
          <h1 className="mt-5 text-2xl font-bold text-gray-900">Crea tu cuenta</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-[#2D6E7E] font-semibold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-5">

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Nombre y Apellido */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Nombre <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Juan"
                   maxLength={20}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8DC63F] focus:border-[#8DC63F] transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Apellido <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={apellido}
                  onChange={e => setApellido(e.target.value)}
                  placeholder="Pérez"
                   maxLength={20}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8DC63F] focus:border-[#8DC63F] transition"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="juan@correo.com"
                maxLength={40}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8DC63F] focus:border-[#8DC63F] transition"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="8 a 20 caracteres"
                 maxLength={20}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8DC63F] focus:border-[#8DC63F] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Usa al menos 8 caracteres, una mayúscula y un número.
            </p>
          </div>

          {/* Confirmar contraseña */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Confirmar contraseña <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Repite tu contraseña"
                 maxLength={20}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8DC63F] focus:border-[#8DC63F] transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Términos */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-0.5 accent-[#8DC63F] h-4 w-4 shrink-0" />
            <span className="text-xs text-gray-500 leading-relaxed">
              Acepto los{' '}
              <Link to="/terminos" className="text-[#2D6E7E] font-semibold hover:underline">
                Términos y condiciones
              </Link>{' '}
              y el{' '}
              <Link to="/privacidad" className="text-[#2D6E7E] font-semibold hover:underline">
                Aviso de privacidad
              </Link>.
            </span>
          </label>

          {/* Botón */}
          <button
            onClick={handleRegistro}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#8DC63F] hover:bg-[#7db535] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-sm mt-1"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creando cuenta...
              </>
            ) : (
              'Crear cuenta'
            )}
          </button>

          {/* Separador */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">¿Ya tienes cuenta?</span>
            </div>
          </div>

          <Link
            to="/login"
            className="block w-full text-center border border-gray-300 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Iniciar sesión
          </Link>

        </div>
      </div>
    </div>
  );
}