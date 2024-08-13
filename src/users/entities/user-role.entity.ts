import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export enum UserRoleValue {
  Administrator = 'ADMIN',
  User = 'USER',
}

@Entity()
@Unique(['role'])
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserRoleValue })
  role: UserRoleValue;
}
