import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Note } from './entities/note.entity';

describe('NotesController', () => {
  const notesServiceFindOneById = jest.fn();

  let notesController: NotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
    })
      .useMocker((token) => {
        if (token === NotesService) {
          return {
            findOneById: notesServiceFindOneById,
          };
        }
      })
      .compile();

    notesController = module.get<NotesController>(NotesController);
  });

  describe('findOne', () => {
    it('should return the found note.', async () => {
      const expectedResult = new Note();
      notesServiceFindOneById.mockResolvedValue(expectedResult);

      const actualResult = await notesController.findOne('test-id');

      expect(actualResult).toBe(expectedResult);
    });

    it('should thrown `NotFoundException` when the note does not exist', async () => {
      notesServiceFindOneById.mockResolvedValue(null);

      expect(
        async () => await notesController.findOne('test-id'),
      ).rejects.toThrow('Note with id `test-id` not found.');
    });
  });
});
