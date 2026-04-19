import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
export declare enum OrderStatus {
    PENDING = "pending",
    PAID = "paid",
    SHIPPED = "shipped",
    CANCELLED = "cancelled"
}
export declare class Order {
    id: string;
    userId: string;
    user: User;
    status: OrderStatus;
    total: string;
    items: OrderItem[];
    createdAt: Date;
}
