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

  listIncidents = async (_req: Request, res: Response): Promise<void> => {
    try {
      const incidents = await this.incidentService.listIncidents();

      res.json({
        message: 'Incidencias obtenidas correctamente',
        data: incidents
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al listar incidencias';
      res.status(500).json({ message });
    }
  };

  getIncidentById = async (req: Request, res: Response): Promise<void> => {
    try {
      const incident = await this.incidentService.getIncidentById(req.params.id);

      res.json({
        message: 'Incidencia obtenida correctamente',
        data: incident
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al obtener incidencia';
      res.status(404).json({ message });
    }
  };

  updateIncidentStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const incident = await this.incidentService.updateIncidentStatus(req.params.id, req.body);

      res.json({
        message: 'Estado actualizado correctamente',
        data: incident
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al actualizar estado';

      if (message.includes('No se encontró')) {
        res.status(404).json({ message });
        return;
      }

      res.status(400).json({ message });
    }
  };
}
