import { Order } from './order.entity';
export declare enum UserRole {
    CUSTOMER = "customer",
    ADMIN = "admin"
}
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    fullName: string | null;
    role: UserRole;
    createdAt: Date;
    orders: Order[];
}
