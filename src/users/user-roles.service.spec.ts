import { Test, TestingModule } from '@nestjs/testing';
import { UserRolesService } from './user-roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';

describe('UserRolesService', () => {
  let service: UserRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRolesService,
        {
          provide: getRepositoryToken(UserRole),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserRolesService>(UserRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
