import { Injectable } from '@nestjs/common';

export enum UserRole {
  Administrator,
  User,
}

export type User = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
};

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

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }
}
