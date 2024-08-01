import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  // finalize,
  Observable,
  tap,
} from 'rxjs';

@Injectable()
export class ExecutionTimeLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before handling...');

    const startTime = Date.now();
    return next.handle().pipe(
      /*
       * `tap()` invokes custom logic upon graceful or exceptional
       * termination of the observable stream, but doesn't otherwise
       * interfere with the response cycle.
       * Checkout the `tap()` method signature and the `TapObserver` interface
       * for more details.
       */
      tap({
        finalize: () =>
          console.log(
            `The handling process took ${Date.now() - startTime} ms.`,
          ),
      }),
      /*
       * It'll achieve the same result as of the above `tap()` call.
       */
      // finalize(() =>
      //   console.log(`The handling process took ${Date.now() - startTime} ms.`),
      // ),
    );
  }
}
