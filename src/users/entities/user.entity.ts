import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  // Unique,
} from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity()
/*
 * Another way of creating a unique key, which is more useful for composite
 * unique keys, e.g., `@Unique(['firstName', 'lastName'])`.
 */
// @Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName?: string;

  @ManyToMany(() => UserRole)
  @JoinTable()
  roles: UserRole[];
}
