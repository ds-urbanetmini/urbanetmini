import { useEffect, useState } from 'react';
import { MediaPreview } from '../components/MediaPreview';
import { StatusBadge } from '../components/StatusBadge';
import { getIncidentById } from '../services/incidentApi';
import { Incident } from '../types/Incident';

interface Props {
  incidentId: string;
  onBack: () => void;
}

export function IncidentDetailPage({ incidentId, onBack }: Props) {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadIncident() {
      try {
        setIsLoading(true);
        setError('');
        const data = await getIncidentById(incidentId);
        setIncident(data);
      } catch (apiError) {
        const message = apiError instanceof Error ? apiError.message : 'No se pudo cargar el detalle';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    loadIncident();
  }, [incidentId]);

  if (isLoading) {
    return <section className="card">Cargando detalle...</section>;
  }

  if (error || !incident) {
    return (
      <section className="card">
        <div className="error-message">{error || 'No se encontró la incidencia'}</div>
        <button className="secondary-button top-space" onClick={onBack}>Volver al panel</button>
      </section>
    );
  }

  const createdDate = new Date(incident.createdAt).toLocaleString('es-PE');

  return (
    <section className="card">
      <button className="link-button" onClick={onBack}>← Volver al panel municipal</button>

      <div className="detail-header">
        <div>
          <p className="eyebrow">Detalle de incidencia</p>
          <h2>{incident.code}</h2>
        </div>
        <StatusBadge status={incident.status} />
      </div>

      <div className="detail-grid">
        <div className="detail-section">
          <h3>Datos del reporte</h3>
          <p><strong>Tipo:</strong> {incident.type}</p>
          <p><strong>Descripción:</strong> {incident.description}</p>
          <p><strong>Ubicación:</strong> {incident.location}</p>
          <p><strong>Fecha:</strong> {createdDate}</p>
          <p><strong>Ciudadano:</strong> {incident.citizenName || 'No registrado'}</p>
          <p><strong>Teléfono:</strong> {incident.phone || 'No registrado'}</p>
          <p><strong>Archivo original:</strong> {incident.mediaOriginalName}</p>
        </div>

        <div className="detail-section">
          <h3>Evidencia multimedia</h3>
          <p className="muted-text">Tipo de evidencia: {incident.mediaType}</p>
          <MediaPreview incident={incident} />
        </div>
      </div>
    </section>
  );
}
