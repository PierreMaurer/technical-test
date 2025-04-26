import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import helmet from 'helmet';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const message =
          errors[0].constraints[Object.keys(errors[0].constraints)[0]];
        return new BadRequestException({
          error: message,
        });
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
