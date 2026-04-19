import type { Request } from 'express';
import { BooksService } from '../books/books.service';
export declare class CartService {
    private readonly booksService;
    constructor(booksService: BooksService);
    private ensureCart;
    getCart(req: Request): {
        items: {
            [x: string]: number;
        };
    };
    addItem(req: Request, bookId: string, quantity: number): Promise<{
        items: {
            [x: string]: number;
        };
    }>;
    setQuantity(req: Request, bookId: string, quantity: number): Promise<{
        items: {
            [x: string]: number;
        };
    }>;
    removeItem(req: Request, bookId: string): Promise<{
        items: {
            [x: string]: number;
        };
    }>;
    clear(req: Request): Promise<{
        items: {};
    }>;
    getRawCart(req: Request): Record<string, number>;
    validateNotEmpty(req: Request): Record<string, number>;
}
