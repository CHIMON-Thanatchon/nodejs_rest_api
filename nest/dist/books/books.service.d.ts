import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksService implements OnModuleInit {
    private readonly bookRepo;
    constructor(bookRepo: Repository<Book>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<Book[]>;
    findOne(id: string): Promise<Book>;
    create(dto: CreateBookDto): Promise<Book>;
    update(id: string, dto: UpdateBookDto): Promise<Book>;
    remove(id: string): Promise<void>;
}
