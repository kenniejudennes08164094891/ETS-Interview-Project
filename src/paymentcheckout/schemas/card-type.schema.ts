import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PaymentType } from '../dto/create-paymentcheckout.dto';

@Schema({ collection: 'card_type' })
export class CardType extends Document {
  @Prop({ enum: PaymentType, default: PaymentType.Card })
  paymentType: PaymentType;

  @Prop({ required: true, min: 50 })
  amount: number;

  @Prop({ required: true })
  cardNumber: string;

  @Prop({ required: true })
  cardExpiryDate: string;

  @Prop({ required: true })
  cardHolderName: string;

  @Prop({ required: true })
  invoiceNumber: string;

  @Prop({ required: true })
  transactionDate: string;
}

export const CardTypeSchema = SchemaFactory.createForClass(CardType);
