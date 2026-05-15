import path from 'path';
import { CreateIncidentData, IncidentRepository } from '../repositories/IncidentRepository';
import { IncidentDocument, IncidentStatus, IncidentType, MediaType } from '../models/Incident';

export interface CreateIncidentRequest {
  type?: string;
  description?: string;
  location?: string;
  citizenName?: string;
  phone?: string;
}

export interface UpdateIncidentStatusRequest {
  status?: string;
}

export class IncidentService {
  private readonly allowedIncidentTypes: IncidentType[] = [
    'Bache',
    'Alumbrado público',
    'Basura acumulada',
    'Seguridad ciudadana',
    'Emergencia'
  ];

  private readonly allowedStatuses: IncidentStatus[] = ['Pendiente', 'En revisión', 'Atendido'];

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

  async listIncidents(): Promise<IncidentDocument[]> {
    return this.incidentRepository.findAll();
  }

  async getIncidentById(id: string): Promise<IncidentDocument> {
    const incident = await this.incidentRepository.findById(id);

    if (!incident) {
      throw new Error('No se encontró la incidencia solicitada');
    }

    return incident;
  }

  async updateIncidentStatus(id: string, data: UpdateIncidentStatusRequest): Promise<IncidentDocument> {
    const status = this.validateStatus(data.status);
    const incident = await this.incidentRepository.updateStatus(id, status);

    if (!incident) {
      throw new Error('No se encontró la incidencia solicitada');
    }

    return incident;
  }

  private validateIncidentData(data: CreateIncidentRequest, file?: Express.Multer.File): void {
    if (!data.type || !this.allowedIncidentTypes.includes(data.type as IncidentType)) {
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

  private validateStatus(status?: string): IncidentStatus {
    if (!status || !this.allowedStatuses.includes(status as IncidentStatus)) {
      throw new Error('El estado no es válido. Use: Pendiente, En revisión o Atendido');
    }

    return status as IncidentStatus;
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
