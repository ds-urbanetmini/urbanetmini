import { Request, Response } from 'express';
import { IncidentService } from '../services/IncidentService';

export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  createIncident = async (req: Request, res: Response): Promise<void> => {
    try {
      const incident = await this.incidentService.createIncident(req.body, req.file);

      res.status(201).json({
        message: 'Incidencia registrada correctamente',
        data: incident
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al registrar la incidencia';
      res.status(400).json({ message });
    }
  };
}
