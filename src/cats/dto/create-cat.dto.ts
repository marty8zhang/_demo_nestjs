import { IsInt, IsString } from 'class-validator';

export class CreateCatDto {
  /*
   * The request field validation will only work when both the in-built
   * `ValidationPipe` and the validation decorator(s) have been used.
   */
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
