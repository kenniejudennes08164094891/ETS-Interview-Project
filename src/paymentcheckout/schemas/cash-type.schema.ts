import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PaymentType } from '../dto/create-paymentcheckout.dto';

@Schema({ collection: 'cash_type' })
export class CashType extends Document {
  @Prop({ enum: PaymentType, default: PaymentType.Cash })
  paymentType: PaymentType;

  @Prop({ required: true, min: 50 })
  amount: number;

  @Prop({ required: true })
  paymentVenue: string;

  @Prop({ required: true })
  invoiceNumber: string;

  @Prop({ required: true })
  transactionDate: string;
}

export const CashTypeSchema = SchemaFactory.createForClass(CashType);
