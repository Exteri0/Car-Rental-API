import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CatchEverythingFilter } from './common/filters/catch-everything.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapterHost));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
