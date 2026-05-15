import { Incident } from '../types/Incident';

interface Props {
  incident: Incident;
  onNewIncident: () => void;
  onGoToPanel: () => void;
}

export function ConfirmationCard({ incident, onNewIncident, onGoToPanel }: Props) {
  return (
    <section className="card confirmation-card">
      <p className="eyebrow">Registro exitoso</p>
      <h2>Incidencia registrada correctamente</h2>
      <div className="tracking-code">{incident.code}</div>
      <p>
        Estado inicial: <strong>{incident.status}</strong>
      </p>
      <p>
        Tipo: <strong>{incident.type}</strong>
      </p>
      <p>
        Evidencia: <strong>{incident.mediaType}</strong> - {incident.mediaOriginalName}
      </p>
      <div className="hero-actions">
        <button className="secondary-button" onClick={onNewIncident}>
          Registrar otra incidencia
        </button>
        <button className="primary-button" onClick={onGoToPanel}>
          Ir al panel municipal
        </button>
      </div>
    </section>
  );
}
