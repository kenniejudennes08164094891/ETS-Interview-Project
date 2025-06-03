import { Test, TestingModule } from '@nestjs/testing';
import { PaymentcheckoutController } from './paymentcheckout.controller';
import { PaymentcheckoutService } from './paymentcheckout.service';

describe('PaymentcheckoutController', () => {
  let controller: PaymentcheckoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentcheckoutController],
      providers: [PaymentcheckoutService],
    }).compile();

    controller = module.get<PaymentcheckoutController>(PaymentcheckoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
