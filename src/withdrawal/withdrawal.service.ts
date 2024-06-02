import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { WithdrawalRequestDto } from './dto/WithdrawalRequest.dto';
import { WithdrawalRepository } from './withdrawal.repository';

@Injectable()
export class WithdrawalService {
  private readonly logger = new Logger(WithdrawalService.name);

  constructor(private repository: WithdrawalRepository) {}
  async request(withdrawalRequestDto: WithdrawalRequestDto) {
    const checkExistingWithrawal = await this.repository.findOne({
      user_id: withdrawalRequestDto.user_id,
    });
    if (checkExistingWithrawal)
      throw new ForbiddenException('در حال حاضر برداشت فعال دارید');

    const transaction = await this.repository.create({
      ...withdrawalRequestDto,
      exchange: {
        connect: {
          id: 1,
        },
      },
    });
    console.log(
      '🚀 ~ file: withdrawal.service.ts:17 ~ WithdrawalService ~ request ~ transaction:',
      transaction,
    );
    return transaction;
  }

  async cancel(id: number) {
    const withdrawal = await this.repository.findOne({
      user_id: id,
    });
    if (!withdrawal) throw new NotFoundException('not found');
    if (withdrawal.status !== 'PENDING')
      throw new NotFoundException('NOT IN VALID STATUS');
    const result = await this.repository.updateById({
      id: id,
      data: { status: 'CANCELED' },
    });
    return result;
  }

  async status(id: number) {
    const result = await this.repository.findById(id);
    return result;
  }
}
