/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from "./dto";
import { JwtGuard } from 'src/auth/guard';

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtGuard)
  @Get()
  users() {
    return this.userService.users();
  }

  @Post()
  create(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }
}
