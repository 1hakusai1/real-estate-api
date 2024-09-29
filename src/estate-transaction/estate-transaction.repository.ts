import { EstateTransactionInfo } from 'src/estate-transaction/EstateTransactionInfo';
import { GetEstateTransactionInfoRequest } from 'src/estate-transaction/GetEstateTransactionInfoRequest';

export interface EstateTransactionRepository {
  getEstateTransactionInfo: (
    req: GetEstateTransactionInfoRequest,
  ) => Promise<EstateTransactionInfo>;
}
