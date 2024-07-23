import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [CatsModule, AnimalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
