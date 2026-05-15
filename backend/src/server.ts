import dotenv from 'dotenv';
import { app } from './app';
import { connectDatabase } from './config/database';

dotenv.config();

const port = Number(process.env.PORT) || 3000;

async function bootstrap(): Promise<void> {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
  });
}

bootstrap();
