import { HttpExceptionFilter } from '@algoan/nestjs-http-exception-filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const httpAdapterHost = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(
    configService.get<number>('server.port'),
    configService.get<string>('server.host'),
  );
  console.log(configService.get<number>('server.port'), configService.get<string>('server.host'));
}
bootstrap();
