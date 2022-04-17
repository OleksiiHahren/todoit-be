import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import initSwagger from '@root/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwagger(app);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
