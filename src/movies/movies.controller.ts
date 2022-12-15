import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';


@Controller("/movies") // 스프링으로 치면 @RestController 의 기본주소와 똑같은 역할.
export class MoviesController {

  // Service 를 받아온다.
  // import 방식으로 받아올 수 도 있으나(NodeJs 에서 사용하는 방식),
  // NestJs 에서는 보통 생성자를 이용하여 Service 를 불러온다.
  constructor(private readonly moviesService:MoviesService) {}

  // get
  @Get()
  getAll():Movie[] {
    return this.moviesService.getAll();
  }

  /**
   * Query는 Query Parameter를 받아올 때 사용하고,
    (예, /users?id=123)
    Param은 Path Variable을 받아올 때 사용.
    (예, /users/123)

    Param은 요청 주소에 포함되어있는 변수를 담아요.
    예를 들어서 localhost:3000/movie/4546 과 같은 주소가 있다면 4546을 담게 되고,
    Query는 주소 이후에 "?" 뒤에 있는 변수를 담게 됩니다.
    예를 들어서 localhost:3000/movie/search?year=2020일 경우에 2020을 담게 된다.
    추가적으로 Path Variable과 Query Parameter를 어떨때 사용하는지는 이하의 설명과 같음.

    어떤 resource를 식별하고 싶으면 Path Variable을 사용하고,
    정렬이나 필터링을 한다면 Query Parameter를 사용하는 것이 Best Practice
   */

  @Get("/:id")
  getOne(@Param('id') movieId: number):Movie {
    return this.moviesService.getOne(movieId);
  }

  // post
  @Post()
  create(@Body() movieData:CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  // delete
  @Delete("/:id")
  remove(@Param("id") movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  // update
  @Patch("/:id")
  patchMovie(@Param("id") movieId: number, @Body() updateData) {
    // return {
    //   updateMovie: movieId,
    //   ...updateData // updateData 내에 존재하는 모든 데이터를 가져온다.
    // }
    return this.moviesService.update(movieId, updateData);
  }



}