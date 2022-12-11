import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

// Controller 만으로 다 되는거 아닌가 하는 의문을 가질 수 있는데, 
// 아키텍처 구조상 둘을 구분하여 프로그램을 작성하는 것이 업계표준.
@Module({
  imports: [],
  controllers: [MoviesController], // Controller 는 url 을 가져오고 function 을 실행한다.
  providers: [MoviesService], // Service 에서는 Controller 에서 사용 할 function 을 구현 & SQL 과 연결한다.
})
export class AppModule {}
