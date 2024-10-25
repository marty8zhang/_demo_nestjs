import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

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

  async update(id: number, user: Partial<User>): Promise<User | null> {
    if (user.id && user.id !== id) {
      throw new Error('User ids mismatch.', {
        cause: {
          origin: `${this.constructor.name}.update()`,
          details: `The given id \`${id}\` is different than \`${user.id}\` in the given user object.`,
        },
      });
    }

    /*
     * There's a known issue with TypeORM that `update()`ing entities with the
     * *-to-many relationships will throw. Hence, `save()` is used instead.
     * See https://github.com/typeorm/typeorm/issues/9863.
     */
    // const { affected } = await this.usersRepository.update(id, user);
    // if (!affected) throw new Error('User not found.');
    // return this.findOneById(id);
    const existingUser = await this.findOneById(id);
    if (!existingUser) {
      throw new Error('User not found.', {
        cause: {
          origin: `${this.constructor.name}.update()`,
          details: `User (id: ${id}) not found.`,
        },
      });
    }

    this.usersRepository.merge(existingUser, user);

    return this.usersRepository.save(existingUser);
  }

  async removeById(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
