import { Injectable } from '@nestjs/common';
import { errorResponse, SellableItems, successResponse } from './dto/create-paymentcheckout.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransferType } from './schemas/transfer-type.schema';
import { CardType } from './schemas/card-type.schema';
import { CashType } from './schemas/cash-type.schema';

@Injectable()
export class PaymentcheckoutService {

  private readonly sellableItems: any[] = SellableItems;
  constructor(
    @InjectModel(TransferType.name) private transferModel: Model<TransferType>,
    @InjectModel(CardType.name) private cardModel: Model<CardType>,
    @InjectModel(CashType.name) private cashModel: Model<CashType>,
  ) { }


  async createTransfer(data: Partial<TransferType>):Promise<any>{
    try {
      const result = await this.transferModel.create(data);
      return successResponse('Transfer successful', result, 201);
    } catch (error) {
      return errorResponse('Transfer failed', error.message, 500);
    }
  }

  async createCard(data: Partial<CardType>):Promise<any>{
    try {
      const result = await this.cardModel.create(data);
      return successResponse('Card payment successful', result, 201);
    } catch (error) {
      return errorResponse('Card payment failed', error.message, 500);
    }
  }

  async createCash(data: Partial<CashType>):Promise<any>{
    try {
      const result = await this.cashModel.create(data);
      return successResponse('Cash payment recorded', result, 201);
    } catch (error) {
      return errorResponse('Cash payment failed', error.message, 500);
    }
  }

  async getSellableItems():Promise<any>{
    try {
      return successResponse('Fetched sellable items', this.sellableItems, 200);
    } catch (error) {
      return errorResponse('Error from fetching items', error.message, 500);
    }
  }

}
