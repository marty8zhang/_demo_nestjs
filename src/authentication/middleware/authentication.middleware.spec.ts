import { AuthenticationMiddleware } from './authentication.middleware';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AuthenticationMiddleware', () => {
  it('should be defined', () => {
    expect(
      new AuthenticationMiddleware(new JwtService(), new ConfigService()),
    ).toBeDefined();
  });
});
