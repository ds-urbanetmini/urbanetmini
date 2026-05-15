import { Document, model, Schema } from 'mongoose';

export type IncidentType = 'Bache' | 'Alumbrado público' | 'Basura acumulada' | 'Seguridad ciudadana' | 'Emergencia';
export type IncidentStatus = 'Pendiente' | 'En revisión' | 'Atendido';
export type MediaType = 'image' | 'video' | 'audio';

export interface IncidentDocument extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const incidentSchema = new Schema<IncidentDocument>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ['Bache', 'Alumbrado público', 'Basura acumulada', 'Seguridad ciudadana', 'Emergencia']
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5
    },
    location: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    citizenName: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      required: true,
      enum: ['Pendiente', 'En revisión', 'Atendido'],
      default: 'Pendiente'
    },
    mediaUrl: {
      type: String,
      required: true
    },
    mediaType: {
      type: String,
      required: true,
      enum: ['image', 'video', 'audio']
    },
    mediaOriginalName: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const IncidentModel = model<IncidentDocument>('Incident', incidentSchema);
