import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserRolesService } from './user-roles.service';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private userRolesService: UserRolesService,
  ) {}

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOneById(id);
  }

  @ResolveField('roles', () => [UserRole])
  async getUserRoles(@Parent() user: User) {
    return await this.userRolesService.findAllByUserId(user.id);
  }
}
