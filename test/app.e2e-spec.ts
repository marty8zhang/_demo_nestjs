import { INestApplication } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { BaseExceptionFilter } from '../src/common/exceptions/filters/base-exception.filter';
import { HttpExceptionFilter } from '../src/common/exceptions/filters/http-exception.filter';

describe('AppController (E2E)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalFilters(
      new BaseExceptionFilter(app.get(HttpAdapterHost)),
      new HttpExceptionFilter(),
    );

    jwtService = module.get<JwtService>(JwtService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /', () => {
    it('should be rejected when missing the access token', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(401)
        .expect((res) => {
          const { timestamp, ...rest } = res.body;
          expect(timestamp).toBeTruthy();
          expect(rest).toEqual({
            statusCode: 401,
            message: 'Access token missing.',
            error: 'Unauthorized',
            path: '/',
          });
        });
    });

    it('should be rejected when the auth type is wrong', () => {
      return request(app.getHttpServer())
        .get('/')
        .set({ Authorization: 'Basic access-token-with-wrong-type' })
        .expect(401)
        .expect((res) => {
          const { timestamp, ...rest } = res.body;
          expect(timestamp).toBeTruthy();
          expect(rest).toEqual({
            statusCode: 401,
            message: 'Access token missing.',
            error: 'Unauthorized',
            path: '/',
          });
        });
    });

    it('should work when the access token is accepted', () => {
      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue({});

      return request(app.getHttpServer())
        .get('/')
        .set({ Authorization: 'Bearer valid-access-token' })
        .expect(200)
        .expect('Hello World!');
    });
  });

  describe('GET /test-base-exception-filter', () => {
    it('should return `500` error, without the need of authentication', () => {
      return request(app.getHttpServer())
        .get('/test-base-exception-filter')
        .expect(500)
        .expect({
          statusCode: 500,
          error: 'This exception will be processed by `BaseExceptionFilter`.',
          isFromBaseExceptionFilter: true,
          requestPath: '/test-base-exception-filter',
        });
    });
  });
});
