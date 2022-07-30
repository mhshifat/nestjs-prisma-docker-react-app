/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class Auth {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}