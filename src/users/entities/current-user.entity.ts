import { UserRole } from './user.entity';

export class CurrentUser {
  sub: number;
  email: string;
  roles: UserRole[];
}
