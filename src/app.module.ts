import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentcheckoutModule } from './paymentcheckout/paymentcheckout.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from './environments/environment.dev';

@Module({
  imports: [
    PaymentcheckoutModule,
    MongooseModule.forRoot(process.env.MONGO_URI || environment.mongoDBClusterUrl),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// npm install @nestjs/mongoose mongoose
// npm i @nestjs/class-validator  
// npm install class-transformer
// npm install --save @nestjs/swagger swagger-ui-express



