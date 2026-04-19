import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
export declare class UsersService {
    private readonly usersRepo;
    constructor(usersRepo: Repository<User>);
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: {
        email: string;
        passwordHash: string;
        fullName?: string | null;
        role?: UserRole;
    }): Promise<User>;
    getByIdOrThrow(id: string): Promise<User>;
}
