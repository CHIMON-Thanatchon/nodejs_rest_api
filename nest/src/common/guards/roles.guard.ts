import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

export type JwtUserPayload = {
  id: string;
  email: string;
  role: UserRole;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required?.length) {
      return true;
    }
    const req = context.switchToHttp().getRequest<{ user?: JwtUserPayload }>();
    const user = req.user;
    if (!user || !required.includes(user.role)) {
      throw new ForbiddenException('ไม่มีสิทธิ์เข้าถึง');
    }
    return true;
  }
}
