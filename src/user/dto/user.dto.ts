/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
