import { Module } from '@nestjs/common';
import { EstateTransactionUsecase } from './estate-transaction.usecase';
import { EstateTransactionController } from 'src/estate-transaction/estate-transaction.controller';
import { ResasAPI } from 'src/estate-transaction/resas/ResasAPI';

@Module({
  providers: [
    EstateTransactionUsecase,
    { provide: 'EstateTransactionRepository', useClass: ResasAPI },
  ],
  controllers: [EstateTransactionController],
})
export class EstateTransactionModule {}
