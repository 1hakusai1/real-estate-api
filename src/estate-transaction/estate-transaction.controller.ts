import { Controller, Get, Query } from '@nestjs/common';
import { EstateTransactionUsecase } from 'src/estate-transaction/estate-transaction.usecase';

@Controller('api/v1/townPlanning/estateTransaction/bar')
export class EstateTransactionController {
  constructor(private usecase: EstateTransactionUsecase) {}
  @Get()
  getEstateTransactionInfo(@Query() params: unknown) {
    console.log(params);
    return { message: this.usecase.getEstateTransactionInfo() };
  }
}
