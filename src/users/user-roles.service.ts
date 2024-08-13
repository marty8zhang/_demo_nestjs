import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole, UserRoleValue } from './entities/user-role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async findOneById(id: number): Promise<UserRole | null> {
    return this.userRoleRepository.findOneBy({ id });
  }

  async findOneByRole(role: UserRoleValue): Promise<UserRole | null> {
    return this.userRoleRepository.findOneBy({ role });
  }
}
