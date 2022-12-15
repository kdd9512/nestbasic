import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  // 임시로 DB 의 역할을 비슷하게 수행할 수 있게 Array 를 만든다.
  private movies: Movie[] = [];

  getAll():Movie[] {
    return this.movies;
  }

  getOne(id:number): Movie{
    const movie = this.movies.find(movie => movie.id === id);
    // 존재하지 않는 ID 로 영화정보를 호출했을 경우 처리.
    if(!movie) {
      throw new NotFoundException(`Cannot Found Movie with ID : ${id}`);
    }
    return movie;
  }

  deleteOne(id:number){
    this.getOne(id);
    this.movies = this.movies.filter(movie => movie.id !== id);
  }

  create(movieData:CreateMovieDto) {
    this.movies.push({
      id:this.movies.length + 1,
      ...movieData // 위에서 정의한 id 를 제외한 movieData 내의 모든 값을 가져온다.
    })
  }

  update(id:number, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({...movie, ...updateData});
  }

}
