import { useEffect, useState } from 'react';
import { IncidentCard } from '../components/IncidentCard';
import { getIncidents } from '../services/incidentApi';
import { Incident } from '../types/Incident';

interface Props {
  onViewDetail: (incidentId: string) => void;
  onRegister: () => void;
}

export function MunicipalPanelPage({ onViewDetail, onRegister }: Props) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadIncidents = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await getIncidents();
      setIncidents(data);
    } catch (apiError) {
      const message = apiError instanceof Error ? apiError.message : 'No se pudieron cargar las incidencias';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <section className="card">
      <div className="page-header">
        <div>
          <p className="eyebrow">Caso de uso 2</p>
          <h2>Panel municipal</h2>
          <p className="card-description">Consulta los reportes registrados y abre el detalle multimedia.</p>
        </div>
        <div className="header-actions">
          <button className="secondary-button" onClick={loadIncidents}>Actualizar</button>
          <button className="primary-button" onClick={onRegister}>Registrar incidencia</button>
        </div>
      </div>

      {isLoading && <p>Cargando incidencias...</p>}
      {error && <div className="error-message">{error}</div>}

      {!isLoading && !error && incidents.length === 0 && (
        <div className="empty-state">
          <h3>No hay incidencias registradas</h3>
          <p>Registra una incidencia con imagen, video o audio para verla en este panel.</p>
        </div>
      )}

      <div className="incidents-grid">
        {incidents.map((incident) => (
          <IncidentCard key={incident._id} incident={incident} onViewDetail={onViewDetail} />
        ))}
      </div>
    </section>
  );
}
