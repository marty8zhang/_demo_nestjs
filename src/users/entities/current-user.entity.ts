import { UserRole } from '../users.service';

export class CurrentUser {
  sub: number;
  email: string;
  roles: UserRole;
}
