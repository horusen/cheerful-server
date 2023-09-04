import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponseInterceptor } from './shared/interceptors/api-response.interceptor';
import { Reflector } from '@nestjs/core';

export const setupApp = async (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: { target: false },
    }),
  );

  app.useGlobalInterceptors(
    new ApiResponseInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  app.setGlobalPrefix('api/v1');
};
