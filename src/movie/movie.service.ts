/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from './../prisma/prisma.service';
import { MovieQueryDto } from "./dto";
import { MovieDto } from "./dto/movie.dto";

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) { }

  async movies(user: User, query: MovieQueryDto) {
    const { search, sort, limit = 5, page = 1 } = query;
    const newQuery = { user_id: user.id };
    if (search) newQuery["OR"] = [
      { name: { contains: search, mode: 'insensitive' } },
      { genra: { contains: search, mode: 'insensitive' } }
    ];
    const movies = await this.prisma.movie.findMany({ where: newQuery, orderBy: { ...sort ? { [sort.split("|")[0]]: sort.split("|")[1] } : { created_at: "desc" } }, take: limit, skip: (page * limit) - limit });
    const totalDocs = await this.prisma.movie.count();
    const totalPage = Math.ceil(+totalDocs / +limit);
    return {
      items: movies,
      page_info: {
        current_page: +page,
        per_page: +limit,
        total: +totalDocs,
        total_page: totalPage,
        next_page: page < totalPage,
        prev_page: page > 1,
      }
    }
  }

  create(dto: MovieDto, user: User) {
    return this.prisma.movie.create({
      data: {
        ...dto,
        user_id: user.id
      }
    });
  }

  update(id: number, dto: Partial<MovieDto>) {
    return this.prisma.movie.update({
      where: { id },
      data: dto
    });
  }

  delete(id: number) {
    return this.prisma.movie.delete({
      where: { id },
    });
  }
}