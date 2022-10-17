import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import initSwagger from '@root/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  initSwagger(app);
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
