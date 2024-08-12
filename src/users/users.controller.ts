import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CurrentUserData } from '../common/decorators/current-user-data.decorator';
import { CurrentUser } from './entities/current-user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if (await this.usersService.findOneByEmail(createUserDto.email)) {
      throw new ConflictException(
        `Email \`${createUserDto.email}\` already exists`,
      );
    }

    createUserDto.email = createUserDto.email.toLowerCase();
    createUserDto.password = Buffer.from(createUserDto.password).toString(
      'base64',
    );

    const { password, ...userData } =
      await this.usersService.create(createUserDto);
    return userData;
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('current')
  // getCurrentUser(@CurrentUserData('email') data: Partial<CurrentUser>) {
  getCurrentUser(@CurrentUserData() data: Partial<CurrentUser>) {
    return data;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with id \`${id}\` not found`);
    }

    const { password, ...userData } = user;

    return userData;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    if (!(await this.usersService.findOneById(id))) {
      throw new NotFoundException(`User with id \`${id}\` not found`);
    }

    return this.usersService.removeById(id);
  }
}
