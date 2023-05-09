import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { createWriteStream } from 'node:fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const accessLogStream = createWriteStream('./access.log', { flags: 'a' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('combined', { stream: accessLogStream }));

  const config = new DocumentBuilder()
    .setTitle('Calendar')
    .setDescription('API documentation of the appointment management')
    .setVersion('1.0')
    .addTag('appointments')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
