import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalRequestDto } from './dto/WithdrawalRequest.dto';

@Controller('withdrawal')
export class WithdrawalController {
  private readonly logger = new Logger(WithdrawalController.name);

  constructor(private readonly withdrawalService: WithdrawalService) {
    this.logger.log('hello from controller!');
  }
  @Post()
  withdrawalRequest(@Body() withdrawalRequestDto: WithdrawalRequestDto) {
    // throw new TetherlandException('withdrawalNotFound');
    return this.withdrawalService.request(withdrawalRequestDto);
  }
  @Get('/:id/cancel')
  cancel(@Param('id') id: number) {
    return this.withdrawalService.cancel(id);
  }
  @Get('/:id/status')
  status(@Param('id') id: number) {
    return this.withdrawalService.status(id);
  }
}
