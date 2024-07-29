import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RuntimeException } from '@nestjs/core/errors/exceptions';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-base-exception-filter')
  testBaseExceptionFilter() {
    throw new RuntimeException(
      'This exception will be processed by `BaseExceptionFilter`.',
    );
  }
}
