import { EstateTransactionInfo } from 'src/estate-transaction/EstateTransactionInfo';
import { GetEstateTransactionInfoRequest } from 'src/estate-transaction/GetEstateTransactionInfoRequest';

export interface EstateTransactionRepository {
  listCityCodes: (prefCode: number) => Promise<string[]>;

  getEstateTransactionInfo: (
    req: GetEstateTransactionInfoRequest,
  ) => Promise<EstateTransactionInfo>;
}
