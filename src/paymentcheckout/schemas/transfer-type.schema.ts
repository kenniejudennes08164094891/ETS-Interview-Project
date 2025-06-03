import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PaymentType } from '../dto/create-paymentcheckout.dto';

@Schema({ collection: 'transfer_type' })
export class TransferType extends Document {
  @Prop({ enum: PaymentType, default: PaymentType.Transfer })
  paymentType: PaymentType;

  @Prop({ required: true, min: 50 })
  amount: number;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  invoiceNumber: string;

  @Prop({ required: true })
  transactionDate: string;
}

export const TransferTypeSchema = SchemaFactory.createForClass(TransferType);
