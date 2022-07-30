/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { MovieDto, MovieQueryDto } from "./dto";
import { User as CurrentUser } from "../auth/decorator";
import { User } from "@prisma/client";

@UseGuards(JwtGuard)
@Controller("movies")
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Get()
  movies(@CurrentUser() user: User, @Query() query: MovieQueryDto) {
    return this.movieService.movies(user, query);
  }

  @Post()
  create(@Body() dto: MovieDto, @CurrentUser() user: User) {
    return this.movieService.create(dto, user);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() dto: MovieDto) {
    return this.movieService.update(+id, dto);
  }

  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.movieService.delete(+id);
  }
}