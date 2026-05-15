import path from 'path';
import { CreateIncidentData, IncidentRepository } from '../repositories/IncidentRepository';
import { IncidentDocument, IncidentType, MediaType } from '../models/Incident';

export interface CreateIncidentRequest {
  type?: string;
  description?: string;
  location?: string;
  citizenName?: string;
  phone?: string;
}

export class IncidentService {
  constructor(private readonly incidentRepository: IncidentRepository) {}

  async createIncident(data: CreateIncidentRequest, file?: Express.Multer.File): Promise<IncidentDocument> {
    this.validateIncidentData(data, file);

    const incidentNumber = (await this.incidentRepository.count()) + 1;
    const code = `INC-${incidentNumber.toString().padStart(4, '0')}`;
    const mediaType = this.getMediaType(file!.mimetype);

    const incidentData: CreateIncidentData = {
      code,
      type: data.type as IncidentType,
      description: data.description!.trim(),
      location: data.location!.trim(),
      citizenName: data.citizenName?.trim() || undefined,
      phone: data.phone?.trim() || undefined,
      status: 'Pendiente',
      mediaUrl: `/uploads/incidents/${path.basename(file!.filename)}`,
      mediaType,
      mediaOriginalName: file!.originalname
    };

    return this.incidentRepository.create(incidentData);
  }

  private validateIncidentData(data: CreateIncidentRequest, file?: Express.Multer.File): void {
    const allowedTypes = ['Bache', 'Alumbrado público', 'Basura acumulada', 'Seguridad ciudadana', 'Emergencia'];

    if (!data.type || !allowedTypes.includes(data.type)) {
      throw new Error('El tipo de incidencia es obligatorio o no es válido');
    }

    if (!data.description || data.description.trim().length < 5) {
      throw new Error('La descripción es obligatoria y debe tener al menos 5 caracteres');
    }

    if (!data.location || data.location.trim().length < 3) {
      throw new Error('La ubicación es obligatoria y debe tener al menos 3 caracteres');
    }

    if (!file) {
      throw new Error('Debe adjuntar una imagen, video o audio como evidencia');
    }

    this.getMediaType(file.mimetype);
  }

  private getMediaType(mimetype: string): MediaType {
    if (mimetype.startsWith('image/')) {
      return 'image';
    }

    if (mimetype.startsWith('video/')) {
      return 'video';
    }

    if (mimetype.startsWith('audio/')) {
      return 'audio';
    }

    throw new Error('El archivo debe ser imagen, video o audio');
  }
}
