import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 테스트할 메서드 명, 테스트 내용
  describe("getAll", () => {

    it('should return an array', () => {

      const result = service.getAll();
      expect(result).toBeInstanceOf(Array); // return 값의 유형이 Array 인지 테스트.

    });

  })

  describe("getAll", () => {
    // it 은 테스트의 조건을 설정한다.
    it('should return a movie', ()=> {
      service.create({
        title: "Test",
        genres:['test'],
        year:9999
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);  
    });

    it('should throw 404 err', () => {
      try{
        service.getOne(99999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);      
        expect(e.message).toEqual('Cannot Found Movie with ID : 99999');
      }
    });

  });

});
