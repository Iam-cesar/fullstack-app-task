import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: '*',
      origin: process.env.UI_URL ?? 'http://localhost:4200',
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
