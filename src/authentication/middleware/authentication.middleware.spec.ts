import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthenticationMiddleware } from './authentication.middleware';

describe('AuthenticationMiddleware', () => {
  it('should be defined', () => {
    expect(
      new AuthenticationMiddleware(new JwtService(), new ConfigService()),
    ).toBeDefined();
  });
});
