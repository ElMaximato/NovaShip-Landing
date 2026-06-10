// importaciones , rutas e iconos
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

// obtiene y limpia la ruta o URL
export function Breadcrumbs() {
  const location = useLocation();
  // Divide la URL en segmentos, ignorando los vacíos
  const pathnames = location.pathname.split('/').filter((x) => x);

  // No mostramos los breadcrumbs en la página principal
  if (pathnames.length === 0) return null;

  // dibuja el breadcrumb si no esta en el inicio
  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 py-3 px-6 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center space-x-2 text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
          <Home className="w-4 h-4" />
          Inicio
        </Link>
        
    
        {pathnames.map((value, index) => { // recorre el array depende de cuantos elementos la ruta tiene
          const last = index === pathnames.length - 1; // mira si es el ultimo elemento
          
          const to = `/${pathnames.slice(0, index + 1).join('/')}`; // 
          
          // Formatea el texto (ej: de "cotizar-envio" a "Cotizar envio")
          const title = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');


          // dibuja el resultado final.
          return (
            <div key={to} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {last ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {title}
                </span>
              ) : (
                <Link to={to} className="hover:text-blue-600 transition-colors">
                  {title}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}