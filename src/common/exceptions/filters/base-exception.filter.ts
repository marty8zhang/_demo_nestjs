import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

/*
 * To catch every unhandled exception (regardless of the exception type), leave
 * the @Catch() decorator's parameter list empty.
 */
@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  /*
   * This code is platform-agnostic because it uses the HTTP adapter to deliver
   * the response, and doesn't use any of the platform-specific objects
   * (`Request` and `Response`) directly.
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    /*
     * GraphQL works differently than a restful API and will cause issues in the
     * code below, hence skipping.
     */
    if (host.getType<string>() === 'graphql') return;

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = {
      statusCode: httpStatus,
      error: (exception as Error).message,
      isFromBaseExceptionFilter: true,
      requestPath: httpAdapter.getRequestUrl(ctx.getRequest()),
      cause: (exception as Error).cause ?? null,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
