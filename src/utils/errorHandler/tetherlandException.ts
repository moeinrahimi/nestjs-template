import { HttpException, HttpStatus } from '@nestjs/common';
import { errorObjectCollection } from './errorObject.collection';
import { TetherlandErrorResponse } from './types/error.type';

/**
 * @class
 * use this class for throwing exception in all over server implementation
 * @example throw new GeneralException("user not found", HttpStatus.INTERNAL_SERVER_ERROR, "یوزر پیدا نشد لطفا ابتدا ثبت نام کنید");
 */
export class TetherlandException extends HttpException {
  /**
   * @param type english message of exception (you should define it in separate object and add it to {@link errorObjectCollection}  )
   * @param givenStatusCode http status of exception
   * @param givenMessage persian description of what happened
   */
  constructor(
    type: keyof typeof errorObjectCollection,
    givenStatusCode?: HttpStatus,
    givenMessage?: string,
  ) {
    //calculate status code
    const statusCode =
      givenStatusCode ??
      errorObjectCollection[type]['status'] ??
      HttpStatus.BAD_REQUEST;
    //calculate description
    const message =
      givenMessage ?? errorObjectCollection[type].description ?? undefined;

    //define and shape response that we wants to return to user
    const response: TetherlandErrorResponse = {
      status: 'failed',
      code: statusCode,
      error: {
        type: type,
        message,
      },
    };
    super(response, statusCode);
  }
}
