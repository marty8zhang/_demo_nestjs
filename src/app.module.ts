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

@Module({
  imports: [CatsModule, AnimalsModule],
  controllers: [AppController],
  providers: [AppService],
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
  }
}
