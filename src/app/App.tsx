import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Benefits } from './components/Benefits';
import { LoginPage } from './pages/LoginPage';
import { CotizarPage } from './pages/CotizarPage';
import { RegistroPage } from './pages/RegistroPage';
import { RastreoPage } from './pages/RastreoPage';
import { EnviosPage } from './pages/EnviosPage';
import { ServiciosPage } from './pages/ServiciosPage';
import { AyudaPage }     from './pages/AyudaPage';
import { TerminosPage } from './pages/TerminosPage';
import { PrivacidadPage } from './pages/PrivacidadPage';
import { ContactoPage } from './pages/ContactoPage';
import { NotFoundPage } from './pages/NotFoundPage';

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/cotizar" element={<CotizarPage />} />
          <Route path="/rastreo" element={<RastreoPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/envios" element={<EnviosPage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/ayuda"     element={<AyudaPage />} />
          <Route path="/terminos" element={<TerminosPage />} />
          <Route path="/privacidad" element={<PrivacidadPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="*" element={<NotFoundPage />} />
          
        </Routes>
      </main>

      <Footer />
    </div>
  );
}