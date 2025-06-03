import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentcheckoutDto } from './create-paymentcheckout.dto';

export class UpdatePaymentcheckoutDto extends PartialType(CreatePaymentcheckoutDto) {}
