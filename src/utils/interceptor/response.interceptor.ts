import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const rsp = ctx.getResponse();

    return next.handle().pipe(
      map((item) => {
        const response = {
          status: 'success',
          data: item.data,
          code: rsp.statusCode,
          message: item.message,
        };

        return response;
      }),
    );
  }
}
