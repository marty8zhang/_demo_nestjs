import { INestApplication, ValidationPipe } from '@nestjs/common';
import { BaseExceptionFilter } from '../exceptions/filters/base-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpExceptionFilter } from '../exceptions/filters/http-exception.filter';
import { ExecutionTimeLoggerInterceptor } from '../interceptors/execution-time-logger.interceptor';
import mongoose from 'mongoose';
// import { ConfigService } from '@nestjs/config';

export function configApplication(app: INestApplication): INestApplication {
  app.useGlobalFilters(
    /*
     * Note: When combining an exception filter that catches everything with a
     * filter that is bound to a specific type, the "Catch anything" filter
     * should be declared first to allow the specific filter to correctly
     * handle the bound type.
     */
    new BaseExceptionFilter(app.get(HttpAdapterHost)),
    new HttpExceptionFilter(),
  );

  app.useGlobalInterceptors(new ExecutionTimeLoggerInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  /*
   * The below lines demonstrate how the `ConfigService` can be used in
   * `main.ts`.
   */
  // const configService = app.get(ConfigService);
  // const port = configService.get('PORT');

  mongoose.set('debug', true);

  return app;
}
