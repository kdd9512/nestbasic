import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  // 임시로 DB 의 역할을 비슷하게 수행할 수 있게 Array 를 만든다.
  private movies: Movie[] = [];

  getAll():Movie[] {
    return this.movies;
  }

  getOne(id:string){
    return this.movies.find(movie => movie.id === +id);
  }

  deleteOne(id:string):boolean {
    this.movies.filter(movie => movie.id !== +id);
    return true;
  }

  create(movieData) {
    this.movies.push({
      id:this.movies.length + 1,
      ...movieData // 위에서 정의한 id 를 제외한 movieData 내의 모든 값을 가져온다.
    })
  }
}
