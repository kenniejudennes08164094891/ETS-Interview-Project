import { Test, TestingModule } from '@nestjs/testing';
import { PaymentcheckoutService } from './paymentcheckout.service';

describe('PaymentcheckoutService', () => {
  let service: PaymentcheckoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentcheckoutService],
    }).compile();

    service = module.get<PaymentcheckoutService>(PaymentcheckoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
