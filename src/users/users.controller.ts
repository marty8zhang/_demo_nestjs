import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CurrentUserData } from '../common/decorators/current-user-data.decorator';
import { CurrentUser } from './entities/current-user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('current')
  // getCurrentUser(@CurrentUserData('email') data: Partial<CurrentUser>) {
  getCurrentUser(@CurrentUserData() data: Partial<CurrentUser>) {
    return data;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id \`${id}\` not found`);
    }

    const { password, ...userData } = user;

    return userData;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    if (!this.usersService.findById(id)) {
      throw new NotFoundException(`User with id \`${id}\` not found`);
    }

    return this.usersService.removeById(id);
  }
}
