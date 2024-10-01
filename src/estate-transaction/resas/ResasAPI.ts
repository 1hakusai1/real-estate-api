import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { EstateTransactionRepository } from 'src/estate-transaction/estate-transaction.repository';
import { EstateTransactionInfo } from 'src/estate-transaction/EstateTransactionInfo';
import { GetEstateTransactionInfoRequest } from 'src/estate-transaction/GetEstateTransactionInfoRequest';
import { ListCitiesResponse } from 'src/estate-transaction/resas/ListCitiesResponse';

@Injectable()
export class ResasAPI implements EstateTransactionRepository {
  async listCityCodes(prefCode: number) {
    const apiKey = process.env.RESAS_API_KEY;
    const response = await axios.get(
      'https://opendata.resas-portal.go.jp/api/v1/cities',
      {
        headers: { 'X-API-KEY': apiKey },
        params: { prefCode },
      },
    );
    const cities = ListCitiesResponse.parse(response.data).result;
    return cities.map((c) => c.cityCode);
  }

  async getEstateTransactionInfo(req: GetEstateTransactionInfoRequest) {
    const apiKey = process.env.RESAS_API_KEY;

    const res = await axios.get(
      `https://opendata.resas-portal.go.jp/api/v1/townPlanning/estateTransaction/bar`,
      { headers: { 'X-API-KEY': apiKey }, params: req },
    );
    return EstateTransactionInfo.parse(res.data);
  }
}
