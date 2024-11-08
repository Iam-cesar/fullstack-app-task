import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.API_PORT ?? 3000;
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: '*',
      origin: process.env.UI_URL ?? 'http://localhost:4200',
    },
  });

  await app.listen(PORT);

  console.log(`Server is running on http://localhost:${PORT}`);
}

bootstrap();
