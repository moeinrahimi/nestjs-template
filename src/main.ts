import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as Sentry from '@sentry/node';
import { ResponseInterceptor } from './utils/interceptor/response.interceptor';
import { ConfigService } from '@nestjs/config';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,

    new FastifyAdapter(),
    { bufferLogs: true },
  );

  const configService = app.get<ConfigService>(ConfigService);
  Sentry.init({
    dsn: configService.get('SENTRY_DNS'),
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
