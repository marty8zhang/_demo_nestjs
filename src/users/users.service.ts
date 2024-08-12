import { Injectable } from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'john.doe@example.com',
      password: 'MTIzNDU2' /* Hashed from `123456`. */,
      firstName: 'John',
      lastName: 'Doe',
      roles: [UserRole.User],
    },
    {
      id: 2,
      email: 'jane.roe@example.com',
      password: 'MTIzNDU2' /* Hashed from `123456`. */,
      firstName: 'Jane',
      lastName: 'Roe',
      roles: [UserRole.Administrator],
    },
  ];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    /*
     * Keep the below code for now to provide the user data needed for
     * authentication. It can be safely removed after the database seeding
     * functionality has been implemented.
     */
    return (
      this.users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase(),
      ) ?? null
    );
    // return this.usersRepository.findOneBy({ email });
  }

  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async removeById(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
