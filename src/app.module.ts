import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AnimalsModule } from './animals/animals.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
// import { APP_FILTER } from '@nestjs/core';
// import { BaseExceptionFilter } from './common/exceptions/filters/base-exception.filter';
// import { HttpExceptionFilter } from './common/exceptions/filters/http-exception.filter';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { AuthenticationMiddleware } from './authentication/middleware/authentication.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    CatsModule,
    AnimalsModule,
    AuthenticationModule,
    UsersModule,
    ConfigModule.forRoot({
      /* Improve performance by skipping further `process.env` access. */
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: '_demo_nestjs',
      entities: [User],
      /*
       * Auto creates database schema on application launch. DON'T ENABLE IT
       * IN PRODUCTION.
       */
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /*
     * Notes:
     * - The exception filters will be applied in the global scope, no
     *   matter in what module that the filters are provided using the below
     *   method. E.g., if you move the below code into the `CatsModule`, the
     *   filter will still be applied globally. Hence, think carefully where
     *   this kind of code should be put at.
     * - When combining an exception filter that catches everything with a
     *   filter that is bound to a specific type, the "Catch anything" filter
     *   should be declared first to allow the specific filter to correctly
     *   handle the bound type.
     */
    // { provide: APP_FILTER, useClass: BaseExceptionFilter },
    // { provide: APP_FILTER, useClass: HttpExceptionFilter },
    // ...
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        LoggerMiddleware,
        // ...
      )
      // Check out the path-to-regexp package for more details.
      .exclude(
        { path: 'cats/(\\d+)', method: RequestMethod.GET },
        // ...
      )
      // Or something more restricted like: `.forRoutes({ path: 'cats', method: RequestMethod.GET })`.
      .forRoutes(
        '/',
        // ...
      );
    consumer
      .apply(AuthenticationMiddleware)
      .exclude(
        { path: 'authentication/sign-in', method: RequestMethod.POST },
        { path: 'test-base-exception-filter', method: RequestMethod.GET },
      )
      .forRoutes('/');
  }
}
