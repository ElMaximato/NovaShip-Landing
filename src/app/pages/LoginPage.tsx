import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';


// promesa 4 — autenticar usuario contra backend
function autenticarUsuario(datos: {
  email: string;
  password: string;
}): Promise<{ token: string; usuario: any }> {
  return new Promise((resolve, reject) => {

    if (datos.email.length < 5 || datos.email.length > 20) {
      reject('El correo debe tener entre 5 y 20 caracteres.');
      return;
    }

    if (datos.password.length < 8 || datos.password.length > 20) {
      reject('La contraseña debe tener entre 8 y 20 caracteres.');
      return;
    }

    fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) { reject(data.error); return; }
        resolve({ token: data.token, usuario: data.usuario });
      })
      .catch(() => reject('No se pudo conectar con el servidor.'));
  });
}

// ═══════════════════════════════════════════
// ASYNC 4 — Ejecuta el login y guarda la sesión
// ═══════════════════════════════════════════
const ejecutarLogin = async (datos: { email: string; password: string }) => {
  const { token, usuario } = await autenticarUsuario(datos);
  // Guarda la sesión en el navegador
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));
  return usuario;
};

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const navigate = useNavigate();

  // ═══════════════════════════════════════════
  // FUNCIÓN PRINCIPAL — Maneja el submit del login
  // ═══════════════════════════════════════════
  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const usuario = await ejecutarLogin({ email, password });
      console.log('Sesión iniciada:', usuario);
      navigate('/'); // Redirige al home tras login exitoso

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
          <h1 className="mt-5 text-2xl font-bold text-gray-900">Bienvenido de vuelta</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-[#2D6E7E] font-semibold hover:underline">
              Regístrate
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
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Contraseña <span className="text-red-500">*</span>
              </label>
              <Link to="/recuperar" className="text-xs text-[#2D6E7E] font-semibold hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
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
          </div>

          {/* Botón */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#8DC63F] hover:bg-[#7db535] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-sm mt-1"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              'Iniciar sesión'
            )}
          </button>

          {/* Separador */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">¿No tienes cuenta?</span>
            </div>
          </div>

          <Link
            to="/registro"
            className="block w-full text-center border border-gray-300 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Crear cuenta nueva
          </Link>

        </div>
      </div>
    </div>
  );
}