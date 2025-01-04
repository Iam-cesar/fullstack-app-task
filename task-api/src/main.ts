import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.API_PORT;
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: '*',
      origin: process.env.UI_URL,
    },
  });

  await app.listen(PORT);
}

bootstrap();
