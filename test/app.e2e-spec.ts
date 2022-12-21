import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

// E2E 테스트 예제.
// end to end 테스트 기동 npm run test:e2e
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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

    it("POST", () => {
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



});
