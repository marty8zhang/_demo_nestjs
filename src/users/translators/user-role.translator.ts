import { UserRole, UserRoleValue } from '../entities/user-role.entity';
import { UserRolesService } from '../user-roles.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRoleTranslator {
  constructor(private readonly userRolesService: UserRolesService) {}

  async valueToObject(value: UserRoleValue): Promise<UserRole> {
    console.log('this.userRolesService:', this.userRolesService);
    const userRole = await this.userRolesService.findOneByRole(value);
    if (!userRole) {
      throw new Error('An invalid user role has been provided.', {
        cause: {
          origin: `${this.constructor.name}.convertUserRoleValuesToUserRoles()`,
          details: `A wrong user role \`${value}\` has been provided.`,
        },
      });
    }

    return userRole;
  }
}
