import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Withdrawal } from '@prisma/client';
@Injectable()
export class WithdrawalRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.WithdrawalCreateInput): Promise<Withdrawal> {
    return this.prisma.withdrawal.create({ data });
  }

  async findById(id: number): Promise<Withdrawal | null> {
    return this.prisma.withdrawal.findUnique({
      where: {
        id: id,
      },
    });
  }
  async findOne(
    where: Prisma.WithdrawalWhereInput,
  ): Promise<Withdrawal | null> {
    return this.prisma.withdrawal.findFirst({
      where: where,
    });
  }

  async updateById(params: {
    id: number;
    data: Prisma.WithdrawalUpdateInput;
  }): Promise<Withdrawal> {
    const { id, data } = params;
    return this.prisma.withdrawal.update({ where: { id: id }, data });
  }
}
