import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { UserRoleTranslator } from './translators/user-role.translator';
import { UserRolesService } from './user-roles.service';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  /* Use `TypeOrmModule.forFeature()` to register entities. */
  imports: [TypeOrmModule.forFeature([User, UserRole])],
  providers: [
    UsersService,
    UserRolesService,
    UserRoleTranslator,
    UsersResolver,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
