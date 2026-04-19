"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("../entities/book.entity");
let BooksService = class BooksService {
    bookRepo;
    constructor(bookRepo) {
        this.bookRepo = bookRepo;
    }
    async onModuleInit() {
        const count = await this.bookRepo.count();
        if (count > 0)
            return;
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
    findAll() {
        return this.bookRepo.find({ order: { title: 'ASC' } });
    }
    async findOne(id) {
        const b = await this.bookRepo.findOne({ where: { id } });
        if (!b)
            throw new common_1.NotFoundException('ไม่พบหนังสือ');
        return b;
    }
    async create(dto) {
        const dup = await this.bookRepo.findOne({ where: { isbn: dto.isbn } });
        if (dup)
            throw new common_1.ConflictException('ISBN ซ้ำ');
        const book = this.bookRepo.create(dto);
        return this.bookRepo.save(book);
    }
    async update(id, dto) {
        const book = await this.findOne(id);
        if (dto.isbn && dto.isbn !== book.isbn) {
            const dup = await this.bookRepo.findOne({ where: { isbn: dto.isbn } });
            if (dup)
                throw new common_1.ConflictException('ISBN ซ้ำ');
        }
        Object.assign(book, dto);
        return this.bookRepo.save(book);
    }
    async remove(id) {
        const book = await this.findOne(id);
        await this.bookRepo.remove(book);
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BooksService);
