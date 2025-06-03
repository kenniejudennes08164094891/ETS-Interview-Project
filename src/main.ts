import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './environments/environment.dev';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      // transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Payment Checkout API')
    .setDescription('API for transfer, card, and cash payments')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // http://localhost:3000/api-docs#/
  await app.listen(process.env.PORT ?? environment.port);
}
bootstrap();
