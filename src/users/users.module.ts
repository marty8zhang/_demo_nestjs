import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRolesService } from './user-roles.service';
import { UserRole } from './entities/user-role.entity';
import { UsersResolver } from './users.resolver';

@Module({
  /* Use `TypeOrmModule.forFeature()` to register entities. */
  imports: [TypeOrmModule.forFeature([User, UserRole])],
  providers: [UsersService, UserRolesService, UsersResolver],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
