import { User } from "@prisma/client";
import { PrismaService } from './../prisma/prisma.service';
import { MovieQueryDto } from "./dto";
import { MovieDto } from "./dto/movie.dto";
export declare class MovieService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    movies(user: User, query: MovieQueryDto): Promise<{
        items: import(".prisma/client").Movie[];
        page_info: {
            current_page: number;
            per_page: number;
            total: number;
            total_page: number;
            next_page: boolean;
            prev_page: boolean;
        };
    }>;
    create(dto: MovieDto, user: User): import(".prisma/client").Prisma.Prisma__MovieClient<import(".prisma/client").Movie>;
    update(id: number, dto: Partial<MovieDto>): import(".prisma/client").Prisma.Prisma__MovieClient<import(".prisma/client").Movie>;
    delete(id: number): import(".prisma/client").Prisma.Prisma__MovieClient<import(".prisma/client").Movie>;
}
