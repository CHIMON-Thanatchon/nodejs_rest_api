import { BadRequestException, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { BooksService } from '../books/books.service';

@Injectable()
export class CartService {
  constructor(private readonly booksService: BooksService) {}

  private ensureCart(req: Request): Record<string, number> {
    if (!req.session.cart) {
      req.session.cart = {};
    }
    return req.session.cart;
  }

  getCart(req: Request) {
    return { items: { ...this.ensureCart(req) } };
  }

  async addItem(req: Request, bookId: string, quantity: number) {
    await this.booksService.findOne(bookId);
    const cart = this.ensureCart(req);
    const prev = cart[bookId] ?? 0;
    cart[bookId] = prev + quantity;
    await new Promise<void>((resolve, reject) => {
      req.session.save((err) => (err ? reject(err) : resolve()));
    });
    return { items: { ...cart } };
  }

  async setQuantity(req: Request, bookId: string, quantity: number) {
    await this.booksService.findOne(bookId);
    const cart = this.ensureCart(req);
    if (quantity <= 0) {
      delete cart[bookId];
    } else {
      cart[bookId] = quantity;
    }
    await new Promise<void>((resolve, reject) => {
      req.session.save((err) => (err ? reject(err) : resolve()));
    });
    return { items: { ...cart } };
  }

  async removeItem(req: Request, bookId: string) {
    const cart = this.ensureCart(req);
    delete cart[bookId];
    await new Promise<void>((resolve, reject) => {
      req.session.save((err) => (err ? reject(err) : resolve()));
    });
    return { items: { ...cart } };
  }

  async clear(req: Request) {
    req.session.cart = {};
    await new Promise<void>((resolve, reject) => {
      req.session.save((err) => (err ? reject(err) : resolve()));
    });
    return { items: {} };
  }

  getRawCart(req: Request): Record<string, number> {
    return { ...this.ensureCart(req) };
  }

  validateNotEmpty(req: Request): Record<string, number> {
    const cart = this.getRawCart(req);
    if (Object.keys(cart).length === 0) {
      throw new BadRequestException('ตะกร้าว่าง');
    }
    return cart;
  }
}
