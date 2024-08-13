import { UserRoleValue } from './user-role.entity';

export class CurrentUser {
  sub: number;
  email: string;
  roles: UserRoleValue[];
}
