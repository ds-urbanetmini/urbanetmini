import { useEffect, useState } from 'react';
import { MediaPreview } from '../components/MediaPreview';
import { StatusBadge } from '../components/StatusBadge';
import { getIncidentById, updateIncidentStatus } from '../services/incidentApi';
import { Incident, IncidentStatus } from '../types/Incident';

interface Props {
  incidentId: string;
  onBack: () => void;
}

const STATUS_OPTIONS: IncidentStatus[] = ['Pendiente', 'En revisión', 'Atendido'];

export function IncidentDetailPage({ incidentId, onBack }: Props) {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<IncidentStatus>('Pendiente');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function loadIncident() {
      try {
        setIsLoading(true);
        setError('');
        const data = await getIncidentById(incidentId);
        setIncident(data);
        setSelectedStatus(data.status);
      } catch (apiError) {
        const message = apiError instanceof Error ? apiError.message : 'No se pudo cargar el detalle';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    loadIncident();
  }, [incidentId]);

  const handleUpdateStatus = async () => {
    if (!incident) {
      return;
    }

    try {
      setIsUpdating(true);
      setError('');
      setSuccessMessage('');
      const updatedIncident = await updateIncidentStatus(incident._id, selectedStatus);
      setIncident(updatedIncident);
      setSuccessMessage('Estado actualizado correctamente');
    } catch (apiError) {
      const message = apiError instanceof Error ? apiError.message : 'No se pudo actualizar el estado';
      setError(message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <section className="card">Cargando detalle...</section>;
  }

  if (error && !incident) {
    return (
      <section className="card">
        <div className="error-message">{error}</div>
        <button className="secondary-button top-space" onClick={onBack}>Volver al panel</button>
      </section>
    );
  }

  if (!incident) {
    return (
      <section className="card">
        <div className="error-message">No se encontró la incidencia</div>
        <button className="secondary-button top-space" onClick={onBack}>Volver al panel</button>
      </section>
    );
  }

  const createdDate = new Date(incident.createdAt).toLocaleString('es-PE');
  const updatedDate = new Date(incident.updatedAt).toLocaleString('es-PE');

  return (
    <section className="card">
      <button className="link-button" onClick={onBack}>← Volver al panel municipal</button>

      <div className="detail-header">
        <div>
          <p className="eyebrow">Caso de uso 3</p>
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
          <p><strong>Fecha de registro:</strong> {createdDate}</p>
          <p><strong>Última actualización:</strong> {updatedDate}</p>
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

      <div className="detail-section status-panel">
        <h3>Gestión municipal</h3>
        <p className="muted-text">Actualiza el estado operativo del reporte.</p>

        <div className="status-form">
          <label htmlFor="status">Estado de la incidencia</label>
          <select
            id="status"
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value as IncidentStatus)}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <button className="primary-button" onClick={handleUpdateStatus} disabled={isUpdating}>
            {isUpdating ? 'Actualizando...' : 'Actualizar estado'}
          </button>
        </div>

        {successMessage && <div className="success-message top-space">{successMessage}</div>}
        {error && <div className="error-message top-space">{error}</div>}
      </div>
    </section>
  );
}
