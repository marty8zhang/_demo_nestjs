import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['roles'] });
  }

  async findOneById(id: number): Promise<User | null> {
    return (
      await this.usersRepository.find({
        where: { id: id },
        relations: ['roles'],
        take: 1,
      })
    )[0];
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return (
      await this.usersRepository.find({
        where: { email: email.toLowerCase() },
        relations: ['roles'],
        take: 1,
      })
    )[0];
  }

  async removeById(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
