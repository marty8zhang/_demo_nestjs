import TestAgent from 'supertest/lib/agent';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { configApplication } from '../../src/common/configs/config-application';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { User } from '../../src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRole } from '../../src/users/entities/user-role.entity';
import { userRoleFixtures } from './fixtures/database/user-role-fixtures';

/*
 * Bypass authentication. Check out `app.e2e-spec.ts` if testing the behaviours
 * of `AuthenticationMiddleware` is desirable.
 */
jest.mock('../../src/authentication/middleware/authentication.middleware');

describe('UsersController (E2E)', () => {
  let testAgent: TestAgent;
  let app: INestApplication;
  let usersRepository: Repository<User>;
  let userRolesRepository: Repository<UserRole>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = configApplication(module.createNestApplication());

    await app.init();

    testAgent = request(app.getHttpServer());

    /* Clean up database. */
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    await usersRepository.delete({});
    userRolesRepository = module.get<Repository<UserRole>>(
      getRepositoryToken(UserRole),
    );
    await userRolesRepository.delete({});
    /* Seed database. */
    await userRolesRepository.save(userRoleFixtures);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /users', () => {
    const createUserRequestBody = {
      email: 'john.doe@example.com',
      password: '123456',
      firstName: 'John',
      lastName: 'Doe',
      roles: ['USER'],
    };

    describe('`CreateUserDto` validation', () => {
      it('should reject the request when the mandatory fields are missing', async () => {
        const response = await testAgent.post('/users').send({});

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body.message).toContain('email should not be empty');
        expect(response.body.message).toContain('password should not be empty');
        expect(response.body.message).toContain(
          'firstName should not be empty',
        );
        expect(response.body.message).toContain('roles should not be empty');
        expect(response.body.message).not.toContain(
          'lastName should not be empty',
        );
      });

      it('should reject the request when the field values are with the wrong types', async () => {
        const response = await testAgent.post('/users').send({
          email: 'john.doe@example-dot-com',
          password: 123456,
          firstName: null,
          lastName: {},
          roles: [1, 1],
        });

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body.message).toContain('email must be an email');
        expect(response.body.message).toContain('password must be a string');
        expect(response.body.message).toContain('firstName must be a string');
        expect(response.body.message).toContain('lastName must be a string');
        expect(response.body.message).toContain(
          'each value in roles must be one of the following values: ADMIN, USER',
        );
        expect(response.body.message).toContain(
          "All roles's elements must be unique",
        );
      });

      it('should save the user with only mandatory fields', async () => {
        const { lastName, ...userDataWithMandatoryFieldsOnly } =
          createUserRequestBody;
        const response = await testAgent
          .post('/users')
          .send(userDataWithMandatoryFieldsOnly);

        expect(response.status).toBe(HttpStatus.CREATED);
        expect(response.body.id).toBeGreaterThan(0);
        expect(response.body.email).toBe('john.doe@example.com');
        expect(response.body.password).toBeUndefined();
        expect(response.body.firstName).toBe('John');
        expect(response.body.lastName).toBeNull();
        expect(response.body.roles[0].role).toBe('USER');

        const user = (
          await usersRepository.find({
            where: { id: response.body.id },
            relations: ['roles'],
          })
        )[0] as User;
        expect(user.id).toBe(response.body.id);
        expect(user.email).toBe('john.doe@example.com');
        expect(user.password).not.toBe('123456');
        expect(user.firstName).toBe('John');
        expect(user.lastName).toBeNull();
        expect(user.roles[0].role).toBe('USER');
      });
    });

    it('should reject the request when there is an existing user with the same email', async () => {
      const existingUser = new User();
      existingUser.email = createUserRequestBody.email;
      existingUser.password = '';
      existingUser.firstName = '';
      existingUser.lastName = '';
      existingUser.roles = [];
      await usersRepository.save(existingUser);

      const response = await testAgent
        .post('/users')
        .send(createUserRequestBody);
      expect(response.status).toBe(HttpStatus.CONFLICT);
      expect(response.body).toMatchObject({
        error: 'Conflict',
        message: 'Email `john.doe@example.com` already exists',
        path: '/users',
        statusCode: 409,
      });
      expect(response.body.timestamp).toBeTruthy();
    });

    it('should save the user with all fields provided with valid values', async () => {
      const response = await testAgent
        .post('/users')
        .send(createUserRequestBody);

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body.id).toBeGreaterThan(0);
      expect(response.body.email).toBe('john.doe@example.com');
      expect(response.body.password).toBeUndefined();
      expect(response.body.firstName).toBe('John');
      expect(response.body.lastName).toBe('Doe');
      expect(response.body.roles[0].role).toBe('USER');

      const user = (
        await usersRepository.find({
          where: { id: response.body.id },
          relations: ['roles'],
        })
      )[0] as User;
      expect(user.email).toBe('john.doe@example.com');
      expect(user.password).not.toBe('123456');
      expect(user.firstName).toBe('John');
      expect(user.lastName).toBe('Doe');
      expect(user.roles[0].role).toBe('USER');
    });
  });
});
