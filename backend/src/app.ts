import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import { incidentRoutes } from './routes/incidentRoutes';

export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ message: 'API Urbanet Mini funcionando' });
});

app.use('/api/incidents', incidentRoutes);

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(400).json({ message: error.message || 'Error inesperado' });
});
