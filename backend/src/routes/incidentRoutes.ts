import { Router } from 'express';
import { IncidentController } from '../controllers/IncidentController';
import { IncidentRepository } from '../repositories/IncidentRepository';
import { IncidentService } from '../services/IncidentService';
import { uploadIncidentMedia } from '../middlewares/uploadMiddleware';

const incidentRepository = new IncidentRepository();
const incidentService = new IncidentService(incidentRepository);
const incidentController = new IncidentController(incidentService);

export const incidentRoutes = Router();

incidentRoutes.get('/', incidentController.listIncidents);
incidentRoutes.post('/', uploadIncidentMedia.single('media'), incidentController.createIncident);
incidentRoutes.get('/:id', incidentController.getIncidentById);
