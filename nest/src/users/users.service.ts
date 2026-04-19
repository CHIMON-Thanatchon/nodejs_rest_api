import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email: email.toLowerCase() } });
  }

  async create(data: {
    email: string;
    passwordHash: string;
    fullName?: string | null;
    role?: UserRole;
  }): Promise<User> {
    const user = this.usersRepo.create({
      email: data.email.toLowerCase(),
      passwordHash: data.passwordHash,
      fullName: data.fullName ?? null,
      role: data.role ?? UserRole.CUSTOMER,
    });
    return this.usersRepo.save(user);
  }

  async getByIdOrThrow(id: string): Promise<User> {
    const u = await this.findById(id);
    if (!u) throw new NotFoundException('ไม่พบผู้ใช้');
    return u;
  }
}
