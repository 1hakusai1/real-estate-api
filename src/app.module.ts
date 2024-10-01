import { Module } from '@nestjs/common';
import { EstateTransactionModule } from './estate-transaction/estate-transaction.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), EstateTransactionModule],
})
export class AppModule {}
