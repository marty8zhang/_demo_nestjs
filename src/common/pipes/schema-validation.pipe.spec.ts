import { SchemaValidationPipe } from './schema-validation.pipe';
import { updateCatSchema } from '../../cats/dto/update-cat.dto';

describe('SchemaValidationPipe', () => {
  it('should be defined', () => {
    expect(new SchemaValidationPipe(updateCatSchema)).toBeDefined();
  });
});
