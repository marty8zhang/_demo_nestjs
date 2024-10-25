import { updateCatSchema } from '../../cats/dto/update-cat.dto';
import { SchemaValidationPipe } from './schema-validation.pipe';

describe('SchemaValidationPipe', () => {
  it('should be defined', () => {
    expect(new SchemaValidationPipe(updateCatSchema)).toBeDefined();
  });
});
