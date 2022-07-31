import { User } from "@prisma/client";
import { AuthService } from './auth.service';
import { Auth } from "./dto/auth.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: Auth): Promise<{
        token: string;
        user: User;
    }>;
    me(user: User): User;
}
