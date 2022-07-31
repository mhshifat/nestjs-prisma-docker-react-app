import { JwtService } from "@nestjs/jwt";
import { PrismaService } from './../prisma/prisma.service';
import { Auth } from "./dto/auth.dto";
export declare class AuthService {
    private readonly prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(dto: Auth): Promise<{
        token: string;
        user: import(".prisma/client").User;
    }>;
    singJwt(id: number, email: string): Promise<string>;
}
