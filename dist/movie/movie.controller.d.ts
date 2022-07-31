import { MovieService } from "./movie.service";
import { MovieDto, MovieQueryDto } from "./dto";
import { User } from "@prisma/client";
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
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
    update(id: number, dto: MovieDto): import(".prisma/client").Prisma.Prisma__MovieClient<import(".prisma/client").Movie>;
    delete(id: number): import(".prisma/client").Prisma.Prisma__MovieClient<import(".prisma/client").Movie>;
}
