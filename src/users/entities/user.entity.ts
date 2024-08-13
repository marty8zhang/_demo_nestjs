import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserRoleValue } from './user-role.entity';

@Entity()
@Unique(['email'])
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

  @Column({ type: 'simple-array', default: [UserRoleValue.User] })
  roles: UserRoleValue[];
}
