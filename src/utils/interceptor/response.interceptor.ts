import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
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
