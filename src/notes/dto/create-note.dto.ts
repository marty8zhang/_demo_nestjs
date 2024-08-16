import {
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsOptional()
  @ArrayUnique()
  @IsArray()
  tags: string[];
}
