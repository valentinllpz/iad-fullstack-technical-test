import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.WEB_ORIGIN || 'http://localhost:8910',
    credentials: true,
  });
  await app.listen(process.env.API_PORT || 8911);
}
bootstrap();
