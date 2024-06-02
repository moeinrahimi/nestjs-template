'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
const _testing = require('@nestjs/testing');
const _withdrawalcontroller = require('../withdrawal.controller');
const _withdrawalStubs = require('./stubs/withdrawalStubs');
const _withdrawalservice = require('../withdrawal.service');
const _withdrawalservicemock = require('../__mocks__/withdrawal.service.mock');
describe('WithdrawalController', () => {
  let controller;
  let service;
  beforeEach(async () => {
    const module = await _testing.Test.createTestingModule({
      controllers: [_withdrawalcontroller.WithdrawalController],
      providers: [_withdrawalservice.WithdrawalService],
    })
      .overrideProvider(_withdrawalservice.WithdrawalService)
      .useValue(_withdrawalservicemock.WithdrawalServiceMock)
      .compile();
    service = module.get(_withdrawalservice.WithdrawalService);
    controller = module.get(_withdrawalcontroller.WithdrawalController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('request withdrawal', () => {
    describe('when withdrawalRequest is called', () => {
      const dto = (0, _withdrawalStubs.WithdrawalRequest)();
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
      const dto = (0, _withdrawalStubs.WithdrawalRequest)();
      test('then it should call cancel method', () => {
        expect(service.cancel).toHaveBeenCalledWith(id);
      });
      test('then it should return withdrawal', () => {
        expect(service.cancel).toHaveReturnedWith({
          id: id,
          ...dto,
        });
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
