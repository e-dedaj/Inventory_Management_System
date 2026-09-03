import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // 1. Shto këtë

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // <-- SHTO KËTË RRESHT KËTU!
  app.useGlobalPipes(new ValidationPipe());// 2. Shto këtë rresht për të aktivizuar validimin automatik
  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
