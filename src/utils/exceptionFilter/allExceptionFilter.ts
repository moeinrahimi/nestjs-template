import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as Sentry from '@sentry/node';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.error(exception)
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      status: 'failed',
      code: httpStatus,
      message: 'Internal Server Error',
    };
    const mode = process.env.ENVIRONMENT;
    if (exception instanceof Error && mode === 'develop') {
      // console.log('general ts exception');
      responseBody.message = exception.message;
    }
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'string') {
        responseBody.message = response;
      } else if (typeof response === 'object' && response !== null) {
        responseBody.message =
          (response as any).message || responseBody.message;
      }
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    Sentry.captureException(exception);
    // console.log(exception, 'exception');
  }
}
// status: 'success',
// data: item.data,
// code: rsp.statusCode,
// message: item.message,
