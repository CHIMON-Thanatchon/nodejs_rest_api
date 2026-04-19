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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const books_service_1 = require("../books/books.service");
let CartService = class CartService {
    booksService;
    constructor(booksService) {
        this.booksService = booksService;
    }
    ensureCart(req) {
        if (!req.session.cart) {
            req.session.cart = {};
        }
        return req.session.cart;
    }
    getCart(req) {
        return { items: { ...this.ensureCart(req) } };
    }
    async addItem(req, bookId, quantity) {
        await this.booksService.findOne(bookId);
        const cart = this.ensureCart(req);
        const prev = cart[bookId] ?? 0;
        cart[bookId] = prev + quantity;
        await new Promise((resolve, reject) => {
            req.session.save((err) => (err ? reject(err) : resolve()));
        });
        return { items: { ...cart } };
    }
    async setQuantity(req, bookId, quantity) {
        await this.booksService.findOne(bookId);
        const cart = this.ensureCart(req);
        if (quantity <= 0) {
            delete cart[bookId];
        }
        else {
            cart[bookId] = quantity;
        }
        await new Promise((resolve, reject) => {
            req.session.save((err) => (err ? reject(err) : resolve()));
        });
        return { items: { ...cart } };
    }
    async removeItem(req, bookId) {
        const cart = this.ensureCart(req);
        delete cart[bookId];
        await new Promise((resolve, reject) => {
            req.session.save((err) => (err ? reject(err) : resolve()));
        });
        return { items: { ...cart } };
    }
    async clear(req) {
        req.session.cart = {};
        await new Promise((resolve, reject) => {
            req.session.save((err) => (err ? reject(err) : resolve()));
        });
        return { items: {} };
    }
    getRawCart(req) {
        return { ...this.ensureCart(req) };
    }
    validateNotEmpty(req) {
        const cart = this.getRawCart(req);
        if (Object.keys(cart).length === 0) {
            throw new common_1.BadRequestException('ตะกร้าว่าง');
        }
        return cart;
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], CartService);
