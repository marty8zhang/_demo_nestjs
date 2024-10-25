import { Test, TestingModule } from '@nestjs/testing';

import { AnimalsModule } from '../animals/animals.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AnimalsModule],
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsService = module.get<CatsService>(CatsService);
    catsController = module.get<CatsController>(CatsController);
  });

  describe('findOne', () => {
    it('should return the expected result', async () => {
      jest
        .spyOn(catsService, 'findOne')
        .mockImplementation((id: number) => `Test cat #${id}`);

      const actualResult = catsController.findOne(123);

      expect(actualResult).toBe('Test cat #123');
    });
  });
});
