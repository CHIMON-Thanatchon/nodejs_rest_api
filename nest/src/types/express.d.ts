import { UserRole } from '../entities/user.entity';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User {
      id: string;
      email: string;
      role: UserRole;
    }
  }
}

export {};
