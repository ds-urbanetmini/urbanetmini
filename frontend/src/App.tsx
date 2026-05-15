import { useState } from 'react';
import { ConfirmationCard } from './components/ConfirmationCard';
import { HomePage } from './pages/HomePage';
import { RegisterIncidentPage } from './pages/RegisterIncidentPage';
import { Incident } from './types/Incident';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'register' | 'confirmation'>('home');
  const [createdIncident, setCreatedIncident] = useState<Incident | null>(null);

  const handleCreated = (incident: Incident) => {
    setCreatedIncident(incident);
    setCurrentView('confirmation');
  };

  const handleNewIncident = () => {
    setCreatedIncident(null);
    setCurrentView('register');
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="logo">urbanetMini</div>
        <span>URBM-2 · Registro multimedia</span>
      </header>

      {currentView === 'home' && <HomePage onStart={() => setCurrentView('register')} />}
      {currentView === 'register' && <RegisterIncidentPage onCreated={handleCreated} />}
      {currentView === 'confirmation' && createdIncident && (
        <ConfirmationCard incident={createdIncident} onNewIncident={handleNewIncident} />
      )}
    </main>
  );
}
