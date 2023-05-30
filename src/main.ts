import { ApiResponseInterceptor } from './shared/interceptors/api-response.interceptor';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useGlobalInterceptors(
    new ApiResponseInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  app.setGlobalPrefix('api/v1');

  await app.listen(3000);
}
bootstrap();
