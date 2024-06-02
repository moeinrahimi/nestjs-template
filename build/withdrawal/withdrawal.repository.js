'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
Object.defineProperty(exports, 'WithdrawalRepository', {
  enumerable: true,
  get: function () {
    return WithdrawalRepository;
  },
});
const _prismaservice = require('../prisma/prisma.service');
const _common = require('@nestjs/common');
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
let WithdrawalRepository = class WithdrawalRepository {
  async create(data) {
    return this.prisma.withdrawal.create({
      data,
    });
  }
  async findById(id) {
    return this.prisma.withdrawal.findUnique({
      where: {
        id: id,
      },
    });
  }
  async findOne(where) {
    return this.prisma.withdrawal.findFirst({
      where: where,
    });
  }
  async updateById(params) {
    const { id, data } = params;
    return this.prisma.withdrawal.update({
      where: {
        id: id,
      },
      data,
    });
  }
  constructor(prisma) {
    this.prisma = prisma;
  }
};
WithdrawalRepository = _ts_decorate(
  [
    (0, _common.Injectable)(),
    _ts_metadata('design:type', Function),
    _ts_metadata('design:paramtypes', [
      typeof _prismaservice.PrismaService === 'undefined'
        ? Object
        : _prismaservice.PrismaService,
    ]),
  ],
  WithdrawalRepository,
);
