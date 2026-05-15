import { Incident } from '../types/Incident';
import { StatusBadge } from './StatusBadge';

interface Props {
  incident: Incident;
  onViewDetail: (incidentId: string) => void;
}

export function IncidentCard({ incident, onViewDetail }: Props) {
  const createdDate = new Date(incident.createdAt).toLocaleString('es-PE');

  return (
    <article className="incident-card">
      <div className="incident-card-header">
        <strong>{incident.code}</strong>
        <StatusBadge status={incident.status} />
      </div>
      <h3>{incident.type}</h3>
      <p>{incident.description}</p>
      <p className="muted-text">Ubicación: {incident.location}</p>
      <p className="muted-text">Registrado: {createdDate}</p>
      <p className="muted-text">Evidencia: {incident.mediaType}</p>
      <button className="secondary-button" onClick={() => onViewDetail(incident._id)}>
        Ver detalle
      </button>
    </article>
  );
}
