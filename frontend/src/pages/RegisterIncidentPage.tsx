import { ChangeEvent, FormEvent, useState } from 'react';
import { createIncident } from '../services/incidentApi';
import { Incident, IncidentType } from '../types/Incident';

const incidentTypes: IncidentType[] = [
  'Bache',
  'Alumbrado público',
  'Basura acumulada',
  'Seguridad ciudadana',
  'Emergencia'
];

interface Props {
  onCreated: (incident: Incident) => void;
}

export function RegisterIncidentPage({ onCreated }: Props) {
  const [type, setType] = useState<IncidentType>('Bache');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [phone, setPhone] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setMedia(selectedFile);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!media) {
      setError('Adjunta una imagen, video o audio como evidencia.');
      return;
    }

    const formData = new FormData();
    formData.append('type', type);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('citizenName', citizenName);
    formData.append('phone', phone);
    formData.append('media', media);

    try {
      setIsSubmitting(true);
      const incident = await createIncident(formData);
      onCreated(incident);
    } catch (apiError) {
      const message = apiError instanceof Error ? apiError.message : 'Ocurrió un error inesperado';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="card">
      <p className="eyebrow">Caso de uso 1</p>
      <h2>Registrar incidencia</h2>
      <p className="card-description">
        Registra un reporte municipal adjuntando una imagen, video o audio como evidencia.
      </p>

      <form className="incident-form" onSubmit={handleSubmit}>
        <label>
          Tipo de incidencia
          <select value={type} onChange={(event) => setType(event.target.value as IncidentType)}>
            {incidentTypes.map((incidentType) => (
              <option key={incidentType} value={incidentType}>
                {incidentType}
              </option>
            ))}
          </select>
        </label>

        <label>
          Descripción
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Ejemplo: Bache grande en la avenida principal"
            required
          />
        </label>

        <label>
          Ubicación
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Ejemplo: Av. Central 123, Villa El Salvador"
            required
          />
        </label>

        <div className="form-grid">
          <label>
            Nombre del ciudadano
            <input
              value={citizenName}
              onChange={(event) => setCitizenName(event.target.value)}
              placeholder="Opcional"
            />
          </label>

          <label>
            Teléfono
            <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Opcional" />
          </label>
        </div>

        <label className="file-input">
          Evidencia multimedia
          <input accept="image/*,video/*,audio/*" type="file" onChange={handleFileChange} required />
          {media && <span>Archivo seleccionado: {media.name}</span>}
        </label>

        {error && <div className="error-message">{error}</div>}

        <button className="primary-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Registrando...' : 'Registrar incidencia'}
        </button>
      </form>
    </section>
  );
}
