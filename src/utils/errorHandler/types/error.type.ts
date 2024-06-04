import { responseStatus } from '@/utils/types/responseStatus.type';

export type TetherlandErrorResponse = {
  status: responseStatus;
  code: number;
  error: { type: string; message: string | null };
};
export type error = {
  message: string;
  error: string;
  statusCode: number;
};
