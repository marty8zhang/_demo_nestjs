import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class CachingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (this.isCached()) {
      const request = context.switchToHttp().getRequest();
      return of({
        data: `This value is returned by \`${this.constructor.name}\`, which overrides the handling of \`${request.method} ${request.url}\`.`,
      });
    }

    return next.handle();
  }

  private isCached(): boolean {
    // Some logic to determine if to use the cached data or not.
    return Math.random() > 0.5;
  }
}
