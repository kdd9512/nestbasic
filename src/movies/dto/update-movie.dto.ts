import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

// 필수사항이 아니라면 변수명에 ? 를 붙혀 선택사항임을 표시한다.
// ex : 
//   @IsString()
//   readonly  title?:string;


export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  
}