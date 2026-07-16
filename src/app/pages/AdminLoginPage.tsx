import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck } from 'lucide-react';

export function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // PROMESA — login del admin contra el backend
    const loginPromise = new Promise<string>((resolve, reject) => {
      fetch('http://localhost:3001/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
        .then((res) => res.json().then((data) => ({ status: res.status, data })))
        .then(({ status, data }) => {
          if (status !== 200) {
            reject(data.error || 'Error al iniciar sesión.');
          } else {
            resolve(data.token);
          }
        })
        .catch(() => reject('No se pudo conectar con el servidor.'));
    });

    // ASYNC — consume la promesa
    try {
      const token = await loginPromise;
      sessionStorage.setItem('admin_token', token);
      navigate('/admin');
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          <div className="flex flex-col items-center mb-6">
            <div className="bg-[#295868] p-3 rounded-xl mb-3">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Panel de administración</h1>
            <p className="text-sm text-gray-500 mt-1">Riú Padel Complex</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Lock className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña de acceso"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#9cbe46]"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ec5c26] hover:bg-[#d54f1c] text-white font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-60"
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}