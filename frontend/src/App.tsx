import { useState } from 'react';
import { ConfirmationCard } from './components/ConfirmationCard';
import { HomePage } from './pages/HomePage';
import { IncidentDetailPage } from './pages/IncidentDetailPage';
import { MunicipalPanelPage } from './pages/MunicipalPanelPage';
import { RegisterIncidentPage } from './pages/RegisterIncidentPage';
import { Incident } from './types/Incident';

type View = 'home' | 'register' | 'confirmation' | 'panel' | 'detail';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [createdIncident, setCreatedIncident] = useState<Incident | null>(null);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);

  const handleCreated = (incident: Incident) => {
    setCreatedIncident(incident);
    setCurrentView('confirmation');
  };

  const handleNewIncident = () => {
    setCreatedIncident(null);
    setCurrentView('register');
  };

  const handleViewDetail = (incidentId: string) => {
    setSelectedIncidentId(incidentId);
    setCurrentView('detail');
  };

  const goToPanel = () => {
    setSelectedIncidentId(null);
    setCurrentView('panel');
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="logo">urbanetMini</div>
        <nav className="topnav">
          <button className="nav-button" onClick={() => setCurrentView('home')}>Inicio</button>
          <button className="nav-button" onClick={() => setCurrentView('register')}>Registrar</button>
          <button className="nav-button" onClick={goToPanel}>Panel municipal</button>
        </nav>
        <span>URBM-3 · Consulta y detalle multimedia</span>
      </header>

      {currentView === 'home' && <HomePage onStart={() => setCurrentView('register')} onMunicipalPanel={goToPanel} />}
      {currentView === 'register' && <RegisterIncidentPage onCreated={handleCreated} />}
      {currentView === 'confirmation' && createdIncident && (
        <ConfirmationCard incident={createdIncident} onNewIncident={handleNewIncident} onGoToPanel={goToPanel} />
      )}
      {currentView === 'panel' && <MunicipalPanelPage onViewDetail={handleViewDetail} onRegister={handleNewIncident} />}
      {currentView === 'detail' && selectedIncidentId && <IncidentDetailPage incidentId={selectedIncidentId} onBack={goToPanel} />}
    </main>
  );
}
