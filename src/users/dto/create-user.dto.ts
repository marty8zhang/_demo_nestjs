import {
  ArrayNotEmpty,
  ArrayUnique,
  IsEmail,
  IsEnum,
  IsString,
} from 'class-validator';
import { UserRoleValue } from '../entities/user-role.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(UserRoleValue, { each: true })
  @ArrayUnique()
  @ArrayNotEmpty()
  roles: UserRoleValue[];
}
