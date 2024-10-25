import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { UserRoleTranslator } from './translators/user-role.translator';
import { UpdateUserInput } from './update-user.input';
import { UserRolesService } from './user-roles.service';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly userRolesService: UserRolesService,
    private readonly userRoleTranslator: UserRoleTranslator,
  ) {}

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOneById(id);
  }

  @ResolveField('roles', () => [UserRole])
  async getUserRoles(@Parent() user: User) {
    return this.userRolesService.findAllByUserId(user.id);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserData') updateUserData: UpdateUserInput) {
    const { id, roles, ...userData } = updateUserData;
    const clonedUserData: Partial<User> = Object.assign({}, userData);
    if (roles) {
      clonedUserData.roles = await Promise.all(
        roles.map(async (value) =>
          this.userRoleTranslator.valueToObject(value),
        ),
      );
    }

    return this.usersService.update(id, clonedUserData);
  }
}
