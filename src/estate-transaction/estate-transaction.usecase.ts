import { Inject, Injectable } from '@nestjs/common';
import { EstateTransactionRepository } from 'src/estate-transaction/estate-transaction.repository';
import { GetEstateTransactionInfoRequest } from 'src/estate-transaction/GetEstateTransactionInfoRequest';

@Injectable()
export class EstateTransactionUsecase {
  constructor(
    @Inject('EstateTransactionRepository')
    private repository: EstateTransactionRepository,
  ) {}

  async getEstateTransactionInfo(req: GetEstateTransactionInfoRequest) {
    return await this.repository.getEstateTransactionInfo(req);
  }
}
