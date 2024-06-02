import { WithdrawalRequestDto } from '../dto/WithdrawalRequest.dto';
import { WithdrawalRequest } from '../test/stubs/withdrawalStubs';

export const WithdrawalServiceMock = {
  request: jest.fn().mockImplementation((data: WithdrawalRequestDto) => {
    return {
      ...data,
      id: 1,
    };
  }),
  cancel: jest.fn().mockImplementation((id: string) => {
    return {
      id: id,
      ...WithdrawalRequest(),
    };
  }),
  status: jest.fn().mockImplementation((id: string) => {
    return {
      id: id,
      status: 'pending',
    };
  }),
};
