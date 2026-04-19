import type { Request } from 'express';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(req: Request): {
        items: {
            [x: string]: number;
        };
    };
    addItem(req: Request, dto: AddCartItemDto): Promise<{
        items: {
            [x: string]: number;
        };
    }>;
    updateItem(req: Request, bookId: string, dto: UpdateCartItemDto): Promise<{
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
}
