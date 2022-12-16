
// DTO : 데이터 전송 객체.
// 보통은 DB 의 컬럼에 맞춰서 만든다.
// 계층 간의 데이터를 교환하기 위하여 필요하다. 

// Controller 는 사용자의 입력을 받아다가 request 등으로 데이터를 가져옴.
// Controller 가 가져온 데이터를 VO(DTO)에 담은 다음, Service 에서 그 데이터를 가져온 다음 DAO 를 호출, 
// DAO 는 Service 에게서 넘겨받은 데이터를 가지고 SQL 을 작동. 

// 이 예제는 readonly 속성을 가지고 있어 DTO 보다는 VO 클래스에 가깝다 할 수 있다..
import { IsString, IsNumber, IsOptional} from "class-validator";

export class CreateMovieDto {
  @IsString()
  readonly  title:string;
  
  @IsNumber()
  readonly year:number;

  @IsString({each:true})
  @IsOptional() // 이 variable 을 선택사항으로 지정한다.
  readonly genres:string[];
}