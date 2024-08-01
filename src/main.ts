import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/filters/http-exception.filter';
import { BaseExceptionFilter } from './common/exceptions/filters/base-exception.filter';
import { ExecutionTimeLoggerInterceptor } from './common/interceptors/execution-time-logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(3000);
}
bootstrap();
