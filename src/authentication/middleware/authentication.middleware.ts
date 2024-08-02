import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { jwtConstants } from '../constants';
import { CurrentUser } from '../../users/entities/current-user.entity';

export interface RequestWithCurrentUser extends Request {
  currentUser: CurrentUser;
}

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: RequestWithCurrentUser, res: Response, next: NextFunction) {
    const token = this.extractToken(req);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      req.currentUser = await this.jwtService.verifyAsync<CurrentUser>(token, {
        secret: jwtConstants.secret,
      });
    } catch {
      throw new UnauthorizedException();
    }

    next();
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
