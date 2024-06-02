import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as Sentry from '@sentry/node';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    console.log(
      '🚀 ~ file: allExceptionFilter.ts:16 ~ AllExceptionsFilter ~ exception:',
      exception,
    );
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
      console.log('general ts exception');
      responseBody.message = exception.message;
    }
    if (exception instanceof HttpException) {
      console.log('http exception');
      //@ts-ignore
      responseBody.message = exception.getResponse().valueOf().message;

      console.log(
        '🚀 ~ file: allExceptionFilter.ts:39 ~ AllExceptionsFilter ~ exception:',
        exception.getResponse(),
      );
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
