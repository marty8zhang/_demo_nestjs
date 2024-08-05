import { Controller, Get } from '@nestjs/common';
import { CurrentUserData } from '../common/decorators/current-user-data.decorator';
import { CurrentUser } from './entities/current-user.entity';

@Controller('users')
export class UsersController {
  @Get('current')
  // getCurrentUser(@CurrentUserData('email') data: Partial<CurrentUser>) {
  getCurrentUser(@CurrentUserData() data: Partial<CurrentUser>) {
    return data;
  }
}
