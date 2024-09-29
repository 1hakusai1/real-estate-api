import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstateTransactionModule } from './estate-transaction/estate-transaction.module';

@Module({
  imports: [EstateTransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
