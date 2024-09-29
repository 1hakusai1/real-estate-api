import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { EstateTransactionRepository } from 'src/estate-transaction/estate-transaction.repository';
import { EstateTransactionInfo } from 'src/estate-transaction/EstateTransactionInfo';
import { GetEstateTransactionInfoRequest } from 'src/estate-transaction/GetEstateTransactionInfoRequest';
import { ListCitiesResponse } from 'src/estate-transaction/ListCitiesResponse';

@Injectable()
export class ResasAPI implements EstateTransactionRepository {
  async getEstateTransactionInfo(req: GetEstateTransactionInfoRequest) {
    const apiKey = process.env.RESAS_API_KEY;

    const listCitiesResponse = await axios.get(
      'https://opendata.resas-portal.go.jp/api/v1/cities',
      { headers: { 'X-API-KEY': apiKey }, params: { prefCode: req.prefCode } },
    );
    const cities = ListCitiesResponse.parse(listCitiesResponse.data).result;
    if (!cities.some((c) => c.cityCode === req.cityCode))
      throw new HttpException('CITY_CODE_MISMATCH', 400);

    const res = await axios.get(
      `https://opendata.resas-portal.go.jp/api/v1/townPlanning/estateTransaction/bar`,
      { headers: { 'X-API-KEY': apiKey }, params: req },
    );
    return EstateTransactionInfo.parse(res.data);
  }
}
