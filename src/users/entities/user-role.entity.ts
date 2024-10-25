import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { User } from './user.entity';

export enum UserRoleValue {
  Administrator = 'ADMIN',
  User = 'USER',
}

@ObjectType()
@Entity()
@Unique(['role'])
export class UserRole {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'enum', enum: UserRoleValue })
  role: UserRoleValue;

  @Field(() => [User])
  /*
   * The second argument of `@ManyToMany()` specifies the reverse relationship,
   * which is vital for querying from the non-owner side.
   */
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
