import { Link } from 'react-router-dom';
import { PackageX } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
      <div className="bg-yellow-100 p-5 rounded-full mb-6">
        <PackageX className="h-12 w-12 text-yellow-600" />
      </div>
      <h1 className="text-6xl font-extrabold text-[#0c1f4a] mb-2">404</h1>
      <h2 className="text-xl font-bold text-gray-800 mb-3">Página no encontrada</h2>
      <p className="text-sm text-gray-500 mb-8 max-w-sm">
        La ruta que buscas no existe o fue movida.
      </p>
      <Link
        to="/"
        className="bg-yellow-400 hover:bg-yellow-300 text-[#0c1f4a] px-6 py-3 rounded-xl font-bold text-sm transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}