import { Incident } from '../types/Incident';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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
