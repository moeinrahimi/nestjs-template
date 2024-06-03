"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WithdrawalService", {
    enumerable: true,
    get: function() {
        return WithdrawalService;
    }
});
const _common = require("@nestjs/common");
const _withdrawalrepository = require("./withdrawal.repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WithdrawalService = class WithdrawalService {
    async request(withdrawalRequestDto) {
        const checkExistingWithrawal = await this.repository.findOne({
            user_id: withdrawalRequestDto.user_id
        });
        if (checkExistingWithrawal) throw new _common.ForbiddenException('در حال حاضر برداشت فعال دارید');
        const transaction = await this.repository.create({
            ...withdrawalRequestDto,
            exchange: {
                connect: {
                    id: 1
                }
            }
        });
        console.log('🚀 ~ file: withdrawal.service.ts:17 ~ WithdrawalService ~ request ~ transaction:', transaction);
        return transaction;
    }
    async cancel(id) {
        const withdrawal = await this.repository.findOne({
            user_id: id
        });
        if (!withdrawal) throw new _common.NotFoundException('not found');
        if (withdrawal.status !== 'PENDING') throw new _common.NotFoundException('NOT IN VALID STATUS');
        const result = await this.repository.updateById({
            id: id,
            data: {
                status: 'CANCELED'
            }
        });
        return result;
    }
    async status(id) {
        const result = await this.repository.findById(id);
        return result;
    }
    constructor(repository){
        this.repository = repository;
        this.logger = new _common.Logger(WithdrawalService.name);
    }
};
WithdrawalService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _withdrawalrepository.WithdrawalRepository === "undefined" ? Object : _withdrawalrepository.WithdrawalRepository
    ])
], WithdrawalService);
