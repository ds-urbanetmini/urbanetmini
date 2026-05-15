import { IncidentDocument, IncidentModel, IncidentStatus, IncidentType, MediaType } from '../models/Incident';

export interface CreateIncidentData {
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
}

export class IncidentRepository {
  async create(data: CreateIncidentData): Promise<IncidentDocument> {
    const incident = new IncidentModel(data);
    return incident.save();
  }

  async findAll(): Promise<IncidentDocument[]> {
    return IncidentModel.find().sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<IncidentDocument | null> {
    return IncidentModel.findById(id).exec();
  }

  async updateStatus(id: string, status: IncidentStatus): Promise<IncidentDocument | null> {
    return IncidentModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).exec();
  }

  async count(): Promise<number> {
    return IncidentModel.countDocuments().exec();
  }
}
