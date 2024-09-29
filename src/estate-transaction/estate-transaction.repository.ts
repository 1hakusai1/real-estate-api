import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { EstateTransactionInfo } from 'src/estate-transaction/EstateTransactionInfo';
import { GetEstateTransactionInfoRequest } from 'src/estate-transaction/GetEstateTransactionInfoRequest';

@Injectable()
export class EstateTransactionRepository {
  async getEstateTransactionInfo(req: GetEstateTransactionInfoRequest) {
    const apiKey = process.env.RESAS_API_KEY;
    const res = await axios.get(
      `https://opendata.resas-portal.go.jp/api/v1/townPlanning/estateTransaction/bar`,
      { headers: { 'X-API-KEY': apiKey }, params: req },
    );
    return EstateTransactionInfo.parse(res.data);
  }
}
