import { NestFactory } from '@nestjs/core';
import { NationalAPIModule } from './national-api/national.api.module';

async function bootstrap() {
  const app = await NestFactory.create(NationalAPIModule);
  app.setGlobalPrefix('/api/national')
  await app.listen(3000);
}
bootstrap();
