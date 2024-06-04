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
import { TetherlandException } from '../errorHandler/tetherlandException';
import {
  error,
  TetherlandErrorResponse,
} from '../errorHandler/types/error.type';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.error(exception);
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: TetherlandErrorResponse = {
      status: 'failed',
      code: httpStatus,
      error: {
        type: 'Internal Server Error',
        message: null,
      },
    };
    if (exception instanceof TetherlandException) {
      console.log(exception.getResponse()['error'], 'tetherland');
      responseBody.error = exception.getResponse()['error'];
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }

    const mode = process.env.ENVIRONMENT;
    if (
      // exception instanceof HttpException &&
      exception instanceof Error &&
      mode === 'test'
    ) {
      console.log('general ts exception');
      responseBody.error = {
        type: exception.message,
        message: null,
      };
    }
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'string') {
        responseBody.error.message = response;
      } else if (typeof response === 'object' && response !== null) {
        responseBody.error.type = (response as error).error;
        responseBody.error.message =
          (response as { message: string }).message ||
          responseBody.error.message;
      }
    }
    // console.log(responseBody);
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    Sentry.captureException(exception);
  }
}
