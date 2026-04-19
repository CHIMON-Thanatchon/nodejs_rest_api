import type { Request } from 'express';
import { OrdersService } from './orders.service';
import { JwtUserPayload } from '../common/guards/roles.guard';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    checkout(req: Request & {
        user: JwtUserPayload;
    }): Promise<import("../entities/order.entity").Order>;
    myOrders(req: Request & {
        user: JwtUserPayload;
    }): Promise<import("../entities/order.entity").Order[]>;
}
