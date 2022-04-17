import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@root/modules/common/config/config.service';

const config = new ConfigService();
const options = new DocumentBuilder()
  .setTitle('Advertisement Server API')
  .setDescription('ArtStation Advertisement Server API documentation')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export default function initSwagger(app: INestApplication): void {
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
};
