import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { UsersService } from '../users/users.service';
import { UserRole } from '../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        id: string;
        email: string;
        fullName: string | null;
        role: UserRole;
    }>;
    login(dto: LoginDto, req: Request): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            fullName: string | null;
            role: UserRole;
        };
    }>;
    logout(req: Request): Promise<{
        ok: boolean;
    }>;
    getMe(req: Request, authHeader?: string): Promise<{
        source: "jwt";
        user: {
            id: string;
            email: string;
            fullName: string | null;
            role: UserRole;
        };
    } | {
        source: "session";
        user: {
            id: string;
            email: string;
            fullName: string | null;
            role: UserRole;
        };
    } | {
        source: null;
        user: null;
    }>;
}
