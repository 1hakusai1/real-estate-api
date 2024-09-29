import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { EstateTransactionUsecase } from 'src/estate-transaction/estate-transaction.usecase';
import { GetEstateTransactionInfoRequest } from 'src/estate-transaction/GetEstateTransactionInfoRequest';

@Controller('api/v1/townPlanning/estateTransaction/bar')
export class EstateTransactionController {
  constructor(private usecase: EstateTransactionUsecase) {}
  @Get()
  getEstateTransactionInfo(@Query() params: unknown) {
    const parsed = GetEstateTransactionInfoRequest.safeParse(params);
    if (!parsed.success) throw new HttpException('BAD_REQUEST', 400);

    return { message: this.usecase.getEstateTransactionInfo() };
  }
}
