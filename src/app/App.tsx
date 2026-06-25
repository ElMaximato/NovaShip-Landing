import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Benefits } from './components/Benefits';
import { LoginPage } from './pages/LoginPage';
import { RegistroPage } from './pages/RegistroPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ReservarPage } from './pages/ReservarPage';

function LandingPage() {
  return (
    <>
      <Hero />
      <Services />
      <Benefits />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Breadcrumbs />

      <main className="flex-grow">
        <Routes>
          <Route path="/"          element={<LandingPage />} />
          <Route path="/login"     element={<LoginPage />} />
          <Route path="/registro"  element={<RegistroPage />} />
          {/* Páginas por construir */}
          <Route path="/precios"   element={<div className="p-8 text-center text-gray-500">Precios — próximamente</div>} />
          <Route path="/clases"    element={<div className="p-8 text-center text-gray-500">Clases — próximamente</div>} />
          <Route path="/torneos"   element={<div className="p-8 text-center text-gray-500">Torneos — próximamente</div>} />
          <Route path="/servicios" element={<div className="p-8 text-center text-gray-500">Servicios — próximamente</div>} />
          <Route path="/contacto"  element={<div className="p-8 text-center text-gray-500">Contacto — próximamente</div>} />
          <Route path="/privacidad" element={<div className="p-8 text-center text-gray-500">Privacidad — próximamente</div>} />
          <Route path="*"          element={<NotFoundPage />} />
          <Route path="/reservar" element={<ReservarPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}