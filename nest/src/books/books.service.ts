import {
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService implements OnModuleInit {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async onModuleInit(): Promise<void> {
    const count = await this.bookRepo.count();
    if (count > 0) return;
    await this.bookRepo.save([
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        isbn: '978-0132350884',
        price: '899.00',
        stock: 15,
      },
      {
        title: 'Design Patterns',
        author: 'Gang of Four',
        isbn: '978-0201633612',
        price: '750.00',
        stock: 8,
      },
      {
        title: 'Refactoring',
        author: 'Martin Fowler',
        isbn: '978-0134757599',
        price: '920.00',
        stock: 12,
      },
    ]);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepo.find({ order: { title: 'ASC' } });
  }

  async findOne(id: string): Promise<Book> {
    const b = await this.bookRepo.findOne({ where: { id } });
    if (!b) throw new NotFoundException('ไม่พบหนังสือ');
    return b;
  }

  async create(dto: CreateBookDto): Promise<Book> {
    const dup = await this.bookRepo.findOne({ where: { isbn: dto.isbn } });
    if (dup) throw new ConflictException('ISBN ซ้ำ');
    const book = this.bookRepo.create(dto);
    return this.bookRepo.save(book);
  }

  async update(id: string, dto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    if (dto.isbn && dto.isbn !== book.isbn) {
      const dup = await this.bookRepo.findOne({ where: { isbn: dto.isbn } });
      if (dup) throw new ConflictException('ISBN ซ้ำ');
    }
    Object.assign(book, dto);
    return this.bookRepo.save(book);
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepo.remove(book);
  }
}
