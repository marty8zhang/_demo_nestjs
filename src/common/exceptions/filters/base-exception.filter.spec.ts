import { BaseExceptionFilter } from './base-exception.filter';
import { AppController } from '../../../app.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../../app.service';
import { HttpAdapterHost } from '@nestjs/core';

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
