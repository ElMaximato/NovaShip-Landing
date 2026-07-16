import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ServiciosPage } from './pages/ServiciosPage';
import { Benefits } from './components/Benefits';
import { LoginPage } from './pages/LoginPage';
import { RegistroPage } from './pages/RegistroPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ReservarPage } from './pages/ReservarPage';
import { PreciosPage } from './pages/PreciosPage';
import { ContactoPage } from './pages/ContactoPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminPage } from './pages/AdminPage';
import { ClasesPage } from './pages/ClasesPage';
import { Services } from './components/Services';
import { ScrollToTop } from './components/ScrollToTop';
import { TorneosPage } from './pages/TorneosPage';
import { AvisoPrivacidadPage } from './pages/AvisoPrivacidadPage';


function LandingPage() {
  return (
    <>
      <Hero />
      <Services   />
      <Benefits />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScrollToTop />
      <Header />
      <Breadcrumbs />

      <main className="flex-grow">
        <Routes>
          <Route path="/"          element={<LandingPage />} />
          <Route path="/login"     element={<LoginPage />} />
          <Route path="/registro"  element={<RegistroPage />} />
          {/* Páginas por construir */}
          <Route path="/precios" element={<PreciosPage />} />
          <Route path="/clases" element={<ClasesPage />} />
          <Route path="/torneos" element={<TorneosPage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/contacto" element={<ContactoPage />} />

          <Route path="/privacidad" element={<AvisoPrivacidadPage />} />
          <Route path="*"          element={<NotFoundPage />} />
          <Route path="/reservar" element={<ReservarPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin"       element={<AdminPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}