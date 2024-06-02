'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
Object.defineProperty(exports, 'WithdrawalController', {
  enumerable: true,
  get: function () {
    return WithdrawalController;
  },
});
const _common = require('@nestjs/common');
const _withdrawalservice = require('./withdrawal.service');
const _WithdrawalRequestdto = require('./dto/WithdrawalRequest.dto');
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r =
      c < 3
        ? target
        : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
    d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if ((d = decorators[i]))
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
  if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
    return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
let WithdrawalController = class WithdrawalController {
  withdrawalRequest(withdrawalRequestDto) {
    return this.withdrawalService.request(withdrawalRequestDto);
  }
  cancel(id) {
    return this.withdrawalService.cancel(id);
  }
  status(id) {
    return this.withdrawalService.status(id);
  }
  constructor(withdrawalService) {
    this.withdrawalService = withdrawalService;
    this.logger = new _common.Logger(WithdrawalController.name);
    this.logger.log('hello from controller!');
  }
};
_ts_decorate(
  [
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata('design:type', Function),
    _ts_metadata('design:paramtypes', [
      typeof _WithdrawalRequestdto.WithdrawalRequestDto === 'undefined'
        ? Object
        : _WithdrawalRequestdto.WithdrawalRequestDto,
    ]),
  ],
  WithdrawalController.prototype,
  'withdrawalRequest',
  null,
);
_ts_decorate(
  [
    (0, _common.Get)('/:id/cancel'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata('design:type', Function),
    _ts_metadata('design:paramtypes', [Number]),
  ],
  WithdrawalController.prototype,
  'cancel',
  null,
);
_ts_decorate(
  [
    (0, _common.Get)('/:id/status'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata('design:type', Function),
    _ts_metadata('design:paramtypes', [Number]),
  ],
  WithdrawalController.prototype,
  'status',
  null,
);
WithdrawalController = _ts_decorate(
  [
    (0, _common.Controller)('withdrawal'),
    _ts_metadata('design:type', Function),
    _ts_metadata('design:paramtypes', [
      typeof _withdrawalservice.WithdrawalService === 'undefined'
        ? Object
        : _withdrawalservice.WithdrawalService,
    ]),
  ],
  WithdrawalController,
);
