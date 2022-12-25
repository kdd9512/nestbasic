import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

// E2E 테스트 예제.
// 이하의 테스트들을 한꺼번에 테스트할 수 있는 기능.
// end to end 테스트 기동 npm run test:e2e
describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach(async () => {
  // 테스트가 새로 실행될 때 마다 beforeEach 로 매 번 실행시키는 것 보다는 
  // 전제조건으로 깔려야 하는 부분은 한 번만 생성하고 그대로 저장하는 것이 좋다.
  // 
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    
    app = moduleFixture.createNestApplication();
    // 실제 구동되는 서비스의 조건.
    // main.ts 에 설정되어 있던 pipe 설정을 test 에서도 적용해주어야 한다.
    app.useGlobalPipes(new ValidationPipe({
      whitelist:true, // 허용한 데이터만 받을 것인가?
      forbidNonWhitelisted:true, // 허용 안한 유형의 데이터는(=entity 에서 정의한) 전부 거부할 것인가?
      transform:true, // 받은 데이터를 알맞은 타입으로 변환할 것인가?
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect("WELCOME HUMAN");
  });

  describe("/movies", () => {
    it("/movies (GET)", () => {
      return request(app.getHttpServer())
        .get("/movies") // 통신을 하는데 get 방식으로 괄호 안 주소와 통신을 하고,
        .expect(200) // 코드 200을 받을 것으로 예상되며,
        .expect([]); // return 값으로 Array 를 받을 것으로 예상된다.
    });

    it("POST 201", () => {
      return request(app.getHttpServer())
        .post("/movies") // 통신을 하는데 post 방식으로 괄호 안 주소와 통신을 하고,
        .send({
          title: "test"
          , year: 2020
          , genres: ['test genre'],
        }) // 이런 형태의 데이터를 보낼 것이며,
        .expect(201); // 응답으로 201 코드 (생성 성공) 를 받을 것으로 예상된다
    });

    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete("/movies") // 통신을 하는데 post 방식으로 괄호 안 주소와 통신을 하고,
        .expect(404); // 자료를 찾을 수 없음(404) 코드를 받을 것으로 예상된다.
    })

  })

  describe("/movies/:id", () => {
    // todo 는 일종의 메모같은 것으로 해야 하는 일을 기록하여 터미널에서 표시할 때 쓸 수 있다.

    // 이하의 GET 통신은 오류가 발생한다.
    // getOne 에서 받는 param 이 number 가 아니라 string 으로 들어온다.
    // 이는 main.ts 에서 transform 옵션을 활성화시켰기 때문인데,
    // test 를 행할 때 역시 해당 옵션을 적용해서 테스트해야만(=실제 구동되는 서비스와 조건을 맞춰줘야만)
    // 원하는 결과를 얻을 수 있게 된다.
    it("GET 200", () => { 
      return request(app.getHttpServer())
      .get("/movies/1")
      .expect(200);
     });
    
     it("GET 404", () => { 
      return request(app.getHttpServer())
      .get("/movies/12314524")
      .expect(404);
     });

    it("PATCH", () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({title:"Avatar 2", year:2022})
      .expect(200);
    });

    it("DELETE", () => {
      return request(app.getHttpServer())
      .delete("/movies/1")
      .expect(200);
    });

    it("POST 404", () => {
      return request(app.getHttpServer())
        .post("/movies") 
        .send({
          title: "test"
          , year: 2020
          , genres: ['test']
          // other는 허용되지 않은 유형의 데이터이다.
          // 허용되지 않은 유형의 데이터(=entity 에서 정의하지 않음)를 전부 ban 하는 
          // "forbidNonWhitelisted" 를 활성화(true) 하였으므로 잘못된 요청이 갈 것.
          , other:"thing" 
        })
        .expect(400); // 응답으로 400(Bad Request) 를 받을 것으로 예상.
    });


  });

});
