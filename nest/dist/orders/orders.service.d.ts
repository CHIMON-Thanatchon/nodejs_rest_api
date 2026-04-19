import { DataSource, Repository } from 'typeorm';
import type { Request } from 'express';
import { Order } from '../entities/order.entity';
import { CartService } from '../cart/cart.service';
export declare class OrdersService {
    private readonly orderRepo;
    private readonly dataSource;
    private readonly cartService;
    constructor(orderRepo: Repository<Order>, dataSource: DataSource, cartService: CartService);
    checkout(userId: string, req: Request): Promise<Order>;
    findByUser(userId: string): Promise<Order[]>;
}
