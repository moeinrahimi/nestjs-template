'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
Object.defineProperty(exports, 'WithdrawalRequestDto', {
  enumerable: true,
  get: function () {
    return WithdrawalRequestDto;
  },
});
const _classvalidator = require('class-validator');
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
let WithdrawalRequestDto = class WithdrawalRequestDto {};
_ts_decorate(
  [
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata('design:type', Number),
  ],
  WithdrawalRequestDto.prototype,
  'user_id',
  void 0,
);
_ts_decorate(
  [
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata('design:type', Number),
  ],
  WithdrawalRequestDto.prototype,
  'amount',
  void 0,
);
_ts_decorate(
  [
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata('design:type', String),
  ],
  WithdrawalRequestDto.prototype,
  'currency',
  void 0,
);
_ts_decorate(
  [
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata('design:type', String),
  ],
  WithdrawalRequestDto.prototype,
  'network',
  void 0,
);
_ts_decorate(
  [
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata('design:type', String),
  ],
  WithdrawalRequestDto.prototype,
  'to_wallet_address',
  void 0,
);
_ts_decorate(
  [
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata('design:type', Number),
  ],
  WithdrawalRequestDto.prototype,
  'bank_suspend_id',
  void 0,
);
