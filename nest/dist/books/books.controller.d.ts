import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    findAll(): Promise<import("../entities/book.entity").Book[]>;
    findOne(id: string): Promise<import("../entities/book.entity").Book>;
    create(dto: CreateBookDto): Promise<import("../entities/book.entity").Book>;
    update(id: string, dto: UpdateBookDto): Promise<import("../entities/book.entity").Book>;
    remove(id: string): Promise<void>;
}
