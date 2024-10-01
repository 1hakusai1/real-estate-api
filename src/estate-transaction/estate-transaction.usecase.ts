import { HttpException, Inject, Injectable } from '@nestjs/common';
import { EstateTransactionRepository } from 'src/estate-transaction/estate-transaction.repository';
import { GetEstateTransactionInfoRequest } from 'src/estate-transaction/GetEstateTransactionInfoRequest';

@Injectable()
export class EstateTransactionUsecase {
  constructor(
    @Inject('EstateTransactionRepository')
    private repository: EstateTransactionRepository,
  ) {}

  async getEstateTransactionInfo(req: GetEstateTransactionInfoRequest) {
    if (req.cityCode !== '-') {
      // 都道府県と都市の組み合わせが不正な場合は400
      const cityCodes = await this.repository.listCityCodes(req.prefCode);
      if (!cityCodes.includes(req.cityCode)) {
        throw new HttpException('CITY_CODE_MISMATCH', 400);
      }
    }
    return await this.repository.getEstateTransactionInfo(req);
  }
}
