import { Order } from './order.entity';
import { Book } from './book.entity';
export declare class OrderItem {
    id: string;
    orderId: string;
    order: Order;
    bookId: string;
    book: Book;
    quantity: number;
    unitPrice: string;
}
