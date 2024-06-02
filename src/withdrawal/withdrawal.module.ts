import { Module } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalController } from './withdrawal.controller';
import { WithdrawalRepository } from './withdrawal.repository';

@Module({
  imports: [],
  providers: [WithdrawalService, WithdrawalRepository],
  controllers: [WithdrawalController],
})
export class WithdrawalModule {}
