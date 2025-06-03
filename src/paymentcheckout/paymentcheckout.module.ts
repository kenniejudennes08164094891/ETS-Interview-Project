import { Module } from '@nestjs/common';
import { PaymentcheckoutService } from './paymentcheckout.service';
import { PaymentcheckoutController } from './paymentcheckout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransferType, TransferTypeSchema } from './schemas/transfer-type.schema';
import { CardType, CardTypeSchema } from './schemas/card-type.schema';
import { CashType, CashTypeSchema } from './schemas/cash-type.schema';

@Module({
    imports: [
    MongooseModule.forFeature([
      { name: TransferType.name, schema: TransferTypeSchema },
      { name: CardType.name, schema: CardTypeSchema },
      { name: CashType.name, schema: CashTypeSchema },
    ]),
  ],
  controllers: [PaymentcheckoutController],
  providers: [PaymentcheckoutService],
})
export class PaymentcheckoutModule {}
