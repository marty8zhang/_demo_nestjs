import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseMappingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      /*
       * Transform the shape of the response body from `object/string` to
       * `{data: object/string}`.
       */
      map((data) => ({ data })),
    );
  }
}
