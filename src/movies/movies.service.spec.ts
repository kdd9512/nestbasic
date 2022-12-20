import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';


// 테스트 : npm run test:cov
describe('MoviesService', () => {
  let service: MoviesService;

  // test 를 실행하기 전 실행
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();
    service = module.get<MoviesService>(MoviesService);

    service.create({
      title: "Test",
      genres:['test'],
      year:9999
    });
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

  describe("deleteOne", () => {
    it('delete a movie', () => {
      // 삭제가 정상적으로 동작할 경우. 지울게 필요하므로 일단 create
      service.create({
        title: "Test",
        genres:['test'],
        year:9999
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      // 데이터가 하나 줄어들면 길이가 하나 줄어들것이므로 이전보다 그 길이가 짧아야 할 것.
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    // 삭제할게 없을경우.
    it('should return a 404' ,() => {
      try {
        service.deleteOne(3454);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it('should create a movie', () => {
      const beforeCreated = service.getAll().length; // 생성전
      service.create({
        title: "Test",
        genres:['test'],
        year:9999
      });
      const afterCreated = service.getAll().length; // 생성후
      console.log(beforeCreated, afterCreated)
      expect(afterCreated).toBeGreaterThan(beforeCreated);
    });
  });

  describe("update", () => {
    it('update movie info', () => {
    
      service.update(1, {title:"Updated!"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Updated!");
    });
  });

});
