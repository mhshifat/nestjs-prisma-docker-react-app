/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class MovieDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  genra: string;
}