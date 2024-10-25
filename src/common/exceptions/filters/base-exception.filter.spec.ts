import { HttpAdapterHost } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from '../../../app.controller';
import { AppService } from '../../../app.service';
import { BaseExceptionFilter } from './base-exception.filter';

describe('BaseExceptionFilter', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  it('should be defined', () => {
    expect(new BaseExceptionFilter(app.get(HttpAdapterHost))).toBeDefined();
  });
});
