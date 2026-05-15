import { Incident } from '../types/Incident';

interface Props {
  incident: Incident;
  onNewIncident: () => void;
}

export function ConfirmationCard({ incident, onNewIncident }: Props) {
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
      <button className="secondary-button" onClick={onNewIncident}>
        Registrar otra incidencia
      </button>
    </section>
  );
}
