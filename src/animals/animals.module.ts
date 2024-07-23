import { Global, Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';

@Global()
@Module({
  providers: [AnimalsService],
  exports: [AnimalsService],
})
export class AnimalsModule {}
