import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  // Unique,
} from 'typeorm';

import { UserRole } from './user-role.entity';

@ObjectType()
@Entity()
/*
 * Another way of creating a unique key, which is more useful for composite
 * unique keys, e.g., `@Unique(['firstName', 'lastName'])`.
 */
// @Unique(['email'])
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName?: string;

  @Field(() => [UserRole])
  /*
   * The second argument of `@ManyToMany()` specifies the reverse relationship,
   * which is vital for querying from the non-owner side.
   */
  @ManyToMany(() => UserRole, (role) => role.users)
  @JoinTable()
  roles: UserRole[];
}
