import { Test } from '@nestjs/testing';
import mock from 'jest-mock-extended/lib/Mock';
import { EstateTransactionModule } from 'src/estate-transaction/estate-transaction.module';
import { EstateTransactionRepository } from 'src/estate-transaction/estate-transaction.repository';
import { EstateTransactionUsecase } from 'src/estate-transaction/estate-transaction.usecase';

describe('EstateTransactionUsecase', () => {
  const mockRepository = mock<EstateTransactionRepository>();
  mockRepository.getEstateTransactionInfo.mockResolvedValue({
    message: null,
    result: {
      prefCode: 13,
      prefName: '東京都',
      cityCode: '13101',
      cityName: '千代田区',
      displayType: '1',
      years: [{ year: 2009, value: 1000000 }],
    },
  });
  mockRepository.listCityCodes.mockResolvedValue(['13101']);

  let usecase: EstateTransactionUsecase;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [EstateTransactionModule],
    })
      .overrideProvider('EstateTransactionRepository')
      .useValue(mockRepository)
      .compile();
    usecase = app.get(EstateTransactionUsecase);
  });

  it('都道府県内に存在しないcityCodeを指定した場合はエラー', async () => {
    expect(
      usecase.getEstateTransactionInfo({
        prefCode: 13,
        cityCode: '999999',
        year: 2015,
        displayType: '1',
      }),
    ).rejects.toThrow();
  });

  it('cityCodeの指定が正しい場合はAPIからの戻り値をそのまま返す', async () => {
    const res = await usecase.getEstateTransactionInfo({
      prefCode: 13,
      cityCode: '13101',
      year: 2015,
      displayType: '1',
    });
    expect(res).toEqual({
      message: null,
      result: {
        prefCode: 13,
        prefName: '東京都',
        cityCode: '13101',
        cityName: '千代田区',
        displayType: '1',
        years: [{ year: 2009, value: 1000000 }],
      },
    });
  });
});
