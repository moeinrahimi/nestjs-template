import { WithdrawalRequestDto } from '@/withdrawal/dto/WithdrawalRequest.dto';

export const WithdrawalRequest = (): WithdrawalRequestDto => {
  return {
    user_id: 1,
    amount: 100,
    currency: 'TRX',
    network: 'TRC20',
    to_wallet_address: 'TWikYY1tiF1jJL2XVJXT5MEdMuefMeT4yi',
    bank_suspend_id: 156000,
  };
};
