# 不動産取引価格API

## ローカル開発環境立ち上げ

このアプリケーションはRESAS-APIを使っています。RESAS-APIを使うために[APIキーの発行](https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html)が必要です

```shell
npm install

cp .env.example .env
vi .env # 発行したAPIキーに置き換える

npm run start:dev
```

### リクエスト例

```shell
curl 'http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2015&prefCode=13&cityCode=13101&displayType=1'
```

### レスポンス

```json
{
  "message": null,
  "result": {
    "prefCode": 13,
    "cityCode": "13101",
    "displayType": "1",
    "prefName": "東京都",
    "cityName": "千代田区",
    "years": [
      {
        "year": 2015,
        "value": 2361873
      }
    ]
  }
}
```

## テスト

```shell
npm run test
```
