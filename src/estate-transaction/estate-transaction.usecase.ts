import { Injectable } from '@nestjs/common';
import { EstateTransactionRepository } from 'src/estate-transaction/estate-transaction.repository';

@Injectable()
export class EstateTransactionUsecase {
  constructor(private repository: EstateTransactionRepository) {}

  getEstateTransactionInfo(): string {
    return this.repository.getEstateTransactionInfo();
  }
}
