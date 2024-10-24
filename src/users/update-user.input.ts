import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRoleValue } from './entities/user-role.entity';

registerEnumType(UserRoleValue, {
  name: 'UserRoleValue',
});

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field(() => [UserRoleValue], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsEnum(UserRoleValue, { each: true })
  @ArrayUnique()
  @ArrayNotEmpty()
  roles?: UserRoleValue[];
}
