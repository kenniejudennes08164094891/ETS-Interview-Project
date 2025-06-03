import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentcheckoutService } from './paymentcheckout.service';
import { CreateCardDto, CreateCashDto, CreateTransferDto } from './dto/create-paymentcheckout.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment Checkout')
@Controller('payment-checkout')
export class PaymentcheckoutController {
  constructor(private readonly paymentcheckoutService: PaymentcheckoutService) { }


  @Post('transfer')
  @ApiOperation({ summary: 'Transfer Payment' })
  @ApiBody({ type: CreateTransferDto })
  async createTransfer(@Body() body: CreateTransferDto) {
    return this.paymentcheckoutService.createTransfer(body);
  }

  @Post('card')
  @ApiOperation({ summary: 'Card Payment' })
  @ApiBody({ type: CreateCardDto })
  async createCard(@Body() body: CreateCardDto) {
    return this.paymentcheckoutService.createCard(body);
  }

  @Post('cash')
  @ApiOperation({ summary: 'Cash Payment' })
  @ApiBody({ type: CreateCashDto })
  async createCash(@Body() body: CreateCashDto) {
    return this.paymentcheckoutService.createCash(body);
  }

  @Get('items')
  @ApiOperation({ summary: 'Get Sellable Items' })
  getItems() {
    return this.paymentcheckoutService.getSellableItems();
  }

}
