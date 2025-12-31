import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ENABLE CORS: This allows the frontend (port 5173) to talk to the backend
  app.enableCors(); 

  // Serve uploaded files from /uploads (so frontend can load images)
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  
  await app.listen(3000);
}
bootstrap();