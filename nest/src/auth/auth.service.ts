import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { Request } from 'express';
import { UsersService } from '../users/users.service';
import { UserRole } from '../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('อีเมลนี้ถูกใช้แล้ว');
    }
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.usersService.create({
      email: dto.email,
      passwordHash,
      fullName: dto.fullName ?? null,
      role: UserRole.CUSTOMER,
    });
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };
  }

  async login(dto: LoginDto, req: Request) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }

    /** จำสถานะล็อกอินผ่าน cookie session (sid เก็บใน PostgreSQL ผ่าน connect-pg-simple) */
    req.session.userId = user.id;
    await new Promise<void>((resolve, reject) => {
      req.session.save((err) => (err ? reject(err) : resolve()));
    });

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  async logout(req: Request) {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => (err ? reject(err) : resolve()));
    });
    return { ok: true };
  }

  /** รองรับทั้ง Bearer JWT และ session cookie (userId ใน session) */
  async getMe(req: Request, authHeader?: string) {
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      try {
        const payload = await this.jwtService.verifyAsync<{
          sub: string;
          email: string;
        }>(token);
        const user = await this.usersService.findById(payload.sub);
        if (user) {
          return {
            source: 'jwt' as const,
            user: {
              id: user.id,
              email: user.email,
              fullName: user.fullName,
              role: user.role,
            },
          };
        }
      } catch {
        // fall through to session
      }
    }
    const sid = req.session.userId;
    if (sid) {
      const user = await this.usersService.findById(sid);
      if (user) {
        return {
          source: 'session' as const,
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
          },
        };
      }
    }
    return { source: null, user: null };
  }
}
