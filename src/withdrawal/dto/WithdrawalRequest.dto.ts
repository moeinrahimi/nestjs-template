import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WithdrawalRequestDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  network: string;

  @IsString()
  @IsNotEmpty()
  to_wallet_address: string;

  @IsNumber()
  @IsNotEmpty()
  bank_suspend_id: number;
}
