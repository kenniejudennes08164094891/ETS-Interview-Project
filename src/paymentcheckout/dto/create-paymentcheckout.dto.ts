import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length, Min } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PaymentType {
  Transfer = 'transfer',
  Card = 'card',
  Cash = 'cash',
}

export const SellableItems: any[] = [
  { name: 'Anova Syrup', price: 5000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg' },
  { name: 'Classic Footwares', price: 7000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg' },
  { name: 'Broil Bags', price: 8000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg' },
  { name: 'Keena Vase', price: 5000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg' },
  { name: 'Classic Watches', price: 9000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg' },
  { name: 'Umbro Boots', price: 10000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg' },
  { name: 'Vanilla Creame', price: 4000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg' },
  { name: 'Veeena Bags', price: 6000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg' },
  { name: 'Amanda Lights', price: 7000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg' },
  { name: 'Svanna Oysters', price: 3000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg' },
  { name: 'PS5 Gamepads', price: 12000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg' },
  { name: 'Classic Tee Bags', price: 5000, image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg' },
];

function getStatusDescription(statusCode: number): string {
  switch (statusCode) {
    case 100: return "CONTINUE";
    case 101: return "SWITCHING_PROTOCOLS";
    case 102: return "PROCESSING";
    case 103: return "EARLYHINTS";
    case 200: return "OK";
    case 201: return "CREATED";
    case 202: return "ACCEPTED";
    case 203: return "NON_AUTHORITATIVE_INFORMATION";
    case 204: return "NO_CONTENT";
    case 205: return "RESET_CONTENT";
    case 206: return "PARTIAL_CONTENT";
    case 300: return "AMBIGUOUS";
    case 301: return "MOVED_PERMANENTLY";
    case 302: return "FOUND";
    case 303: return "SEE_OTHER";
    case 304: return "NOT_MODIFIED";
    case 307: return "TEMPORARY_REDIRECT";
    case 308: return "PERMANENT_REDIRECT";
    case 400: return "BAD_REQUEST";
    case 401: return "UNAUTHORIZED";
    case 402: return "PAYMENT_REQUIRED";
    case 403: return "FORBIDDEN";
    case 404: return "NOT_FOUND";
    case 405: return "METHOD_NOT_ALLOWED";
    case 406: return "NOT_ACCEPTABLE";
    case 407: return "PROXY_AUTHENTICATION_REQUIRED";
    case 408: return "REQUEST_TIMEOUT";
    case 409: return "CONFLICT";
    case 410: return "GONE";
    case 411: return "LENGTH_REQUIRED";
    case 412: return "PRECONDITION_FAILED";
    case 413: return "PAYLOAD_TOO_LARGE";
    case 414: return "URI_TOO_LONG";
    case 415: return "UNSUPPORTED_MEDIA_TYPE";
    case 416: return "REQUESTED_RANGE_NOT_SATISFIABLE";
    case 417: return "EXPECTATION_FAILED";
    case 418: return "I_AM_A_TEAPOT";
    case 421: return "MISDIRECTED";
    case 422: return "UNPROCESSABLE_ENTITY";
    case 424: return "FAILED_DEPENDENCY";
    case 428: return "PRECONDITION_REQUIRED";
    case 429: return "TOO_MANY_REQUESTS";
    case 500: return "INTERNAL_SERVER_ERROR";
    case 501: return "NOT_IMPLEMENTED";
    case 502: return "BAD_GATEWAY";
    case 503: return "SERVICE_UNAVAILABLE";
    case 504: return "GATEWAY_TIMEOUT";
    case 505: return "HTTP_VERSION_NOT_SUPPORTED";
    default: return "UNKNOWN_STATUS";
  }
}

export function successResponse(message: string, data: any = null, statusCode: number) {
  const statusDecription = getStatusDescription(statusCode);
  return {
    success: true,
    message,
    data,
    statusDecription,
    timestamp: new Date().toISOString(),
  };
}

export function errorResponse(message: string, error: any = null, statusCode: number) {
  const statusDecription = getStatusDescription(statusCode);
  return {
    success: false,
    message,
    error,
    statusDecription,
    timestamp: new Date().toISOString(),
  };
}

export class CreatePaymentcheckoutDto{}

export class CreateTransferDto {
  @ApiProperty()
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @ApiProperty()
  @IsNumber()
  @Min(50)
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  transactionDate: string;
}


export class CreateCardDto {
  @ApiProperty()
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @ApiProperty()
  @IsNumber()
  @Min(50)
  amount: number;

  @ApiProperty()
  @IsString()
  @Length(16, 16)
  cardNumber: string;

  @ApiProperty()
  @IsString()
  @Length(5, 5)
  cardExpiryDate: string;

  @ApiProperty()
  @IsString()
  cardHolderName: string;

  @ApiProperty()
  @IsString()
  invoiceNumber: string;

  @ApiProperty()
  @IsString()
  transactionDate: string;
}

export class CreateCashDto {
  @ApiProperty()
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @ApiProperty()
  @IsNumber()
  @Min(50)
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentVenue: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  transactionDate: string;
}

