import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstateTransactionModule } from './estate-transaction/estate-transaction.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), EstateTransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
