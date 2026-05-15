export type IncidentType = 'Bache' | 'Alumbrado público' | 'Basura acumulada' | 'Seguridad ciudadana' | 'Emergencia';
export type IncidentStatus = 'Pendiente' | 'En revisión' | 'Atendido';
export type MediaType = 'image' | 'video' | 'audio';

export interface Incident {
  _id: string;
  code: string;
  type: IncidentType;
  description: string;
  location: string;
  citizenName?: string;
  phone?: string;
  status: IncidentStatus;
  mediaUrl: string;
  mediaType: MediaType;
  mediaOriginalName: string;
  createdAt: string;
  updatedAt: string;
}
