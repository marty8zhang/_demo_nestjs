import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { CurrentUser } from '../../users/entities/current-user.entity';
import { ConfigService } from '@nestjs/config';

export interface RequestWithCurrentUser extends Request {
  currentUser: CurrentUser;
}

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async use(req: RequestWithCurrentUser, res: Response, next: NextFunction) {
    const token = this.extractToken(req);
    if (!token) {
      throw new UnauthorizedException('Access token missing.');
    }

    try {
      req.currentUser = await this.jwtService.verifyAsync<CurrentUser>(token, {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Access token invalid.');
    }

    next();
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
