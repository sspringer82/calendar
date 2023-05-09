import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { createWriteStream } from 'node:fs';

const accessLogStream = createWriteStream('./access.log', { flags: 'a' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('combined', { stream: accessLogStream }));

  await app.listen(3000);
}
bootstrap();
