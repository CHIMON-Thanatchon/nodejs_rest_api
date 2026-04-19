import type { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        id: string;
        email: string;
        fullName: string | null;
        role: import("../entities/user.entity").UserRole;
    }>;
    login(dto: LoginDto, req: Request): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            fullName: string | null;
            role: import("../entities/user.entity").UserRole;
        };
    }>;
    logout(req: Request): Promise<{
        ok: boolean;
    }>;
    me(req: Request, authorization?: string): Promise<{
        source: "jwt";
        user: {
            id: string;
            email: string;
            fullName: string | null;
            role: import("../entities/user.entity").UserRole;
        };
    } | {
        source: "session";
        user: {
            id: string;
            email: string;
            fullName: string | null;
            role: import("../entities/user.entity").UserRole;
        };
    } | {
        source: null;
        user: null;
    }>;
}
