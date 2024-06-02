'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
const _testing = require('@nestjs/testing');
const _healthcontroller = require('./health.controller');
describe('HealthController', () => {
  let controller;
  beforeEach(async () => {
    const module = await _testing.Test.createTestingModule({
      controllers: [_healthcontroller.HealthController],
    }).compile();
    controller = module.get(_healthcontroller.HealthController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
