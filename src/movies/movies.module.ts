import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

// 기존에 app.modules.ts 에서 삽입했던 Controller / Service 를 이 파일에서 묶어 삽입한다.
@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
