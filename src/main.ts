import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { CustomLogger } from './logger/logger.service';

dotenv.config();
const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const logger = app.get(CustomLogger);

  process.on('uncaughtException', (err) => {
    logger.error(`Uncaught exception: ${err}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error(`Unhandled Rejection: ${reason}`);
    process.exit(1);
  });

  const apiDocs = parse(
    await readFile(join(__dirname, '..', 'doc/api.yaml'), 'utf-8'),
  );
  SwaggerModule.setup('doc', app, apiDocs);

  await app.listen(PORT);
}
bootstrap();
