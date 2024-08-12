import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  Administrator = 0,
  User = 1,
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

  // @Column({ default: [UserRole.User] })
  roles: UserRole[];
}
