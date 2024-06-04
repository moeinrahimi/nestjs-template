import { HttpStatus } from '@nestjs/common';

export const withdrawalErrorObject = {
  withdrawalNotFound: {
    description: 'چنین درخواست پرداشتی یافت نشد',
    status: HttpStatus.NOT_FOUND,
    type: 'withdrawalNotFound',
  },
};
