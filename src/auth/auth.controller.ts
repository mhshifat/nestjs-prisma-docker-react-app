/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { AuthService } from './auth.service';
import { Auth } from "./dto/auth.dto";
import { User as CurrentUser } from "./decorator";
import { JwtGuard } from "./guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post()
  login(@Body() dto: Auth) {
    return this.authService.login(dto)
  }

  @UseGuards(JwtGuard)
  @Get("me")
  me(@CurrentUser() user: User) {
    return user || null;
  }
}