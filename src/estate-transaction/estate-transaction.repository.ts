import { Injectable } from '@nestjs/common';

@Injectable()
export class EstateTransactionRepository {
  getEstateTransactionInfo(): string {
    return 'DUMMY MESSAGE';
  }
}
