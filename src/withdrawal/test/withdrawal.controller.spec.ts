import { Test, TestingModule } from '@nestjs/testing';
import { WithdrawalController } from '../withdrawal.controller';

import { WithdrawalRequest } from './stubs/withdrawalStubs';
import { WithdrawalService } from '../withdrawal.service';
import { WithdrawalServiceMock } from '../__mocks__/withdrawal.service.mock';

describe('WithdrawalController', () => {
  let controller: WithdrawalController;
  let service: WithdrawalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WithdrawalController],
      providers: [WithdrawalService],
    })
      .overrideProvider(WithdrawalService)
      .useValue(WithdrawalServiceMock)
      .compile();
    service = module.get<WithdrawalService>(WithdrawalService);
    controller = module.get<WithdrawalController>(WithdrawalController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('request withdrawal', () => {
    describe('when withdrawalRequest is called', () => {
      const dto = WithdrawalRequest();
      beforeEach(async () => {
        await controller.withdrawalRequest(dto);
      });

      test('then it should call request method', () => {
        expect(service.request).toHaveBeenCalledWith(dto);
      });
    });
  });

  describe('cancel withdrawal', () => {
    describe('when cancel is called', () => {
      const id = '1';
      beforeEach(async () => {
        await controller.cancel(id);
      });
      const dto = WithdrawalRequest();

      test('then it should call cancel method', () => {
        expect(service.cancel).toHaveBeenCalledWith(id);
      });
      test('then it should return withdrawal', () => {
        expect(service.cancel).toHaveReturnedWith({ id: id, ...dto });
      });
    });
  });
  describe('get withdrawal status', () => {
    describe('when status  is called', () => {
      const id = '1';

      beforeEach(async () => {
        await controller.status(id);
      });

      test('then it should call status method', () => {
        expect(service.status).toHaveBeenCalledWith(id);
      });
      test('then it should return status', () => {
        expect(service.status).toHaveReturnedWith({
          id: id,
          status: expect.any(String),
        });
      });
    });
  });
});
