import { UserService } from './user.service';
import { UserDto } from "./dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    users(): import(".prisma/client").PrismaPromise<{
        id: number;
        created_at: Date;
        first_name: string;
        last_name: string;
        email: string;
    }[]>;
    create(dto: UserDto): Promise<import(".prisma/client").User>;
}
