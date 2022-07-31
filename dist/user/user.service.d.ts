import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    users(): import(".prisma/client").PrismaPromise<{
        id: number;
        created_at: Date;
        first_name: string;
        last_name: string;
        email: string;
    }[]>;
    create(dto: UserDto): Promise<import(".prisma/client").User>;
}
