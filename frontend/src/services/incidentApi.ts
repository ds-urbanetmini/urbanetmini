import { Incident, IncidentStatus } from '../types/Incident';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const SERVER_URL = API_URL.replace('/api', '');

export function getMediaUrl(mediaUrl: string): string {
  if (mediaUrl.startsWith('http')) {
    return mediaUrl;
  }

  return `${SERVER_URL}${mediaUrl}`;
}

export async function createIncident(formData: FormData): Promise<Incident> {
  const response = await fetch(`${API_URL}/incidents`, {
    method: 'POST',
    body: formData
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'No se pudo registrar la incidencia');
  }

  return result.data;
}

export async function getIncidents(): Promise<Incident[]> {
  const response = await fetch(`${API_URL}/incidents`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'No se pudieron obtener las incidencias');
  }

  return result.data;
}

export async function getIncidentById(id: string): Promise<Incident> {
  const response = await fetch(`${API_URL}/incidents/${id}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'No se pudo obtener el detalle de la incidencia');
  }

  return result.data;
}

export async function updateIncidentStatus(id: string, status: IncidentStatus): Promise<Incident> {
  const response = await fetch(`${API_URL}/incidents/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'No se pudo actualizar el estado');
  }

  return result.data;
}
