import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { NoteDocument, Note } from '../../src/notes/entities/note.entity';
import { Model } from 'mongoose';
import { configApplication } from '../../src/common/configs/config-application';

/*
 * Bypass authentication. Check out `app.e2e-spec.ts` if testing the behaviours
 * of `AuthenticationMiddleware` is desirable.
 */
jest.mock('../../src/authentication/middleware/authentication.middleware');

describe('NotesController (E2E)', () => {
  let testAgent: TestAgent;
  let app: INestApplication;
  let notesRepository: Model<Note>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = configApplication(module.createNestApplication());

    await app.init();

    testAgent = request(app.getHttpServer());

    /* Clean up database. */
    notesRepository = module.get('NoteModel');
    await notesRepository.db.dropDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /notes', () => {
    const createNoteRequestBody = {
      title: 'Test Title',
      description: 'Test description of Test Note',
      content: 'The main content of Test Note.',
      author: 'Test Author',
      tags: ['Software Development', 'Software Engineering'],
    };

    describe('`CreateNoteDto` validation', () => {
      it('should reject the request when the mandatory fields are missing', async () => {
        const { title, author, ...createNoteDtoWithoutMandatoryFields } =
          createNoteRequestBody;
        const response = await testAgent
          .post('/notes')
          .send(createNoteDtoWithoutMandatoryFields);

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body.message).toContain('title should not be empty');
        expect(response.body.message).toContain('author should not be empty');
      });

      it('should reject the request when the field values are with the wrong types', async () => {
        const response = await testAgent.post('/notes').send({
          title: 123,
          description: true,
          content: {},
          author: undefined,
          tags: [123, false, 123],
        });

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body.message).toContain('title must be a string');
        expect(response.body.message).toContain('description must be a string');
        expect(response.body.message).toContain('content must be a string');
        expect(response.body.message).toContain('author must be a string');
        expect(response.body.message).toContain(
          'each value in tags must be a string',
        );
        expect(response.body.message).toContain(
          "All tags's elements must be unique",
        );
      });

      it('should save the note with only mandatory fields', async () => {
        const response = await testAgent.post('/notes').send({
          title: 'Test Title',
          author: 'Test Author',
        });

        expect(response.status).toBe(HttpStatus.CREATED);
        expect(response.body._id).toBeTruthy();
        expect(response.body.title).toEqual('Test Title');
        expect(response.body.author).toEqual('Test Author');

        const note = (await notesRepository.findOne({
          _id: response.body._id,
        })) as NoteDocument;
        expect(note.title).toEqual('Test Title');
        expect(note.author).toEqual('Test Author');
      });
    });

    it('should reject the request when there is an existing note with the same title', async () => {
      await new notesRepository(createNoteRequestBody).save();
      const response = await testAgent
        .post('/notes')
        .send(createNoteRequestBody);

      expect(response.status).toBe(HttpStatus.CONFLICT);
      expect(response.body).toMatchObject({
        error: 'Conflict',
        message: 'Note `Test Title` already exists',
        path: '/notes',
        statusCode: 409,
      });
      expect(response.body.timestamp).toBeTruthy();
    });

    it('should save the note with all fields provided with valid values', async () => {
      const response = await testAgent.post('/notes').send({
        ...createNoteRequestBody,
        ...{ invalidField: 'This field should be ignored' },
      });

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body._id).toBeTruthy();
      expect(response.body.title).toEqual('Test Title');
      expect(response.body.author).toEqual('Test Author');
      expect(response.body.description).toEqual(
        'Test description of Test Note',
      );
      expect(response.body.content).toEqual('The main content of Test Note.');
      expect(response.body.tags).toEqual([
        'Software Development',
        'Software Engineering',
      ]);
      expect(response.body.invalidField).not.toBeDefined();

      const note = (await notesRepository.findOne({
        title: 'Test Title',
      })) as NoteDocument & { invalidField: any };
      expect(note._id).toBeTruthy();
      expect(note.title).toEqual('Test Title');
      expect(note.author).toEqual('Test Author');
      expect(note.description).toEqual('Test description of Test Note');
      expect(note.content).toEqual('The main content of Test Note.');
      expect(note.tags).toEqual([
        'Software Development',
        'Software Engineering',
      ]);
      expect(note.invalidField).not.toBeDefined();
    });
  });
});
