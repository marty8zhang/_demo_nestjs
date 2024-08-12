import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'john.doe@example.com',
      password: '123456',
      firstName: 'John',
      lastName: 'Doe',
      roles: [UserRole.User],
    },
    {
      id: 2,
      email: 'jane.roe@example.com',
      password: '123456',
      firstName: 'Jane',
      lastName: 'Roe',
      roles: [UserRole.Administrator],
    },
  ];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return (
      this.users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase(),
      ) ?? null
    );
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async removeById(id: number): Promise<void> {
    if (!(await this.findById(id))) {
      throw new NotFoundException(`User with id \`${id}\` not found`);
    }

    await this.usersRepository.delete(id);
  }
}
