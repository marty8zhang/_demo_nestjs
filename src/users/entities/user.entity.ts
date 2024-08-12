import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  Administrator = 'ADMIN',
  User = 'USER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'simple-array', default: [UserRole.User] })
  roles: UserRole[];
}
