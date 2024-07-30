import {
  // ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class SchemaValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  // transform(value: unknown, metadata: ArgumentMetadata) {
  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException(
        'Validation failed. See the `error` field for more details.',
        {
          cause: error,
          description: error.message,
        },
      );
    }
  }
}
