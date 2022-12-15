import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 시작은 터미널 - npm run start:dev (watch 모드)
// 중지는 터미널 클릭 후 CTRL + C
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 데이터 타입 유효성 검사를 위한 Pipe 사용.
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, // 허용한 데이터만 받을 것인가?
    forbidNonWhitelisted:true, // 허용 안한건 전부 거부할 것인가?
    transform:true, // 받은 데이터를 알맞은 타입으로 변환할 것인가?
  }));
  await app.listen(3000);
}
bootstrap();
