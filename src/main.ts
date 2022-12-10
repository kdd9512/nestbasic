import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 시작은 터미널 - npm run start:dev
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
