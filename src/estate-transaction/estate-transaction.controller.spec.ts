import { Test } from '@nestjs/testing';
import mock, { MockProxy } from 'jest-mock-extended/lib/Mock';
import { EstateTransactionController } from 'src/estate-transaction/estate-transaction.controller';
import { EstateTransactionModule } from 'src/estate-transaction/estate-transaction.module';
import { EstateTransactionUsecase } from 'src/estate-transaction/estate-transaction.usecase';

describe('リクエストパラメータのバリデーションのテスト', () => {
  const mockUsecase: MockProxy<EstateTransactionUsecase> = mock();
  mockUsecase.getEstateTransactionInfo.mockResolvedValue({
    message: null,
    result: {
      prefCode: 1,
      prefName: '東京都',
      cityCode: '1',
      cityName: '千代田区',
      displayType: '1',
      years: [{ year: 2009, value: 1000000 }],
    },
  });
  let controller: EstateTransactionController;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [EstateTransactionModule],
    })
      .overrideProvider(EstateTransactionUsecase)
      .useValue(mockUsecase)
      .compile();
    controller = app.get(EstateTransactionController);
  });

  it('正常系', async () => {
    const response = await controller.getEstateTransactionInfo({
      year: '2015',
      prefCode: '13',
      cityCode: '13101',
      displayType: '1',
    });

    expect(response).toEqual({
      message: null,
      result: {
        prefCode: 1,
        prefName: '東京都',
        cityCode: '1',
        cityName: '千代田区',
        displayType: '1',
        years: [{ year: 2009, value: 1000000 }],
      },
    });
  });

  it('yearが2009より前', async () => {
    await expect(
      controller.getEstateTransactionInfo({
        year: '2008',
        prefCode: '13',
        cityCode: '13101',
        displayType: '1',
      }),
    ).rejects.toThrow();
  });

  it('yearが2021より後', async () => {
    await expect(
      controller.getEstateTransactionInfo({
        year: '2022',
        prefCode: '13',
        cityCode: '13101',
        displayType: '1',
      }),
    ).rejects.toThrow();
  });

  it('prefCodeが1~47でない', async () => {
    await expect(
      controller.getEstateTransactionInfo({
        year: '2015',
        prefCode: '50',
        cityCode: '13101',
        displayType: '1',
      }),
    ).rejects.toThrow();
  });

  it('displayTypeが1~5でない', async () => {
    await expect(
      controller.getEstateTransactionInfo({
        year: '2015',
        prefCode: '13',
        cityCode: '13101',
        displayType: '10',
      }),
    ).rejects.toThrow();
  });
});
