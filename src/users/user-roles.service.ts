import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole, UserRoleValue } from './entities/user-role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRolesRepository: Repository<UserRole>,
  ) {}

  async findAllByUserId(userId: number): Promise<UserRole[]> {
    return this.userRolesRepository.find({
      where: { users: { id: userId } },
    });
  }

  async findOneById(id: number): Promise<UserRole | null> {
    return this.userRolesRepository.findOneBy({ id });
  }

  async findOneByRole(role: UserRoleValue): Promise<UserRole | null> {
    return this.userRolesRepository.findOneBy({ role });
  }
}
