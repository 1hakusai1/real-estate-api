import { Module } from '@nestjs/common';
import { EstateTransactionUsecase } from './estate-transaction.usecase';
import { EstateTransactionRepository } from 'src/estate-transaction/estate-transaction.repository';
import { EstateTransactionController } from 'src/estate-transaction/estate-transaction.controller';

@Module({
  providers: [EstateTransactionUsecase, EstateTransactionRepository],
  controllers: [EstateTransactionController],
})
export class EstateTransactionModule {}
