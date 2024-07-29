import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let responseBody = {
      statusCode: exception.getStatus(),
      message: exception.getResponse(),
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    if (typeof responseBody.message === 'object') {
      responseBody = { ...responseBody, ...responseBody.message };
    }

    response.status(exception.getStatus()).json(responseBody);
  }
}
