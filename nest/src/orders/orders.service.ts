import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import type { Request } from 'express';
import { Order, OrderStatus } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Book } from '../entities/book.entity';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly dataSource: DataSource,
    private readonly cartService: CartService,
  ) {}

  async checkout(userId: string, req: Request): Promise<Order> {
    const cart = this.cartService.validateNotEmpty(req);

    const orderId = await this.dataSource.transaction(async (manager) => {
      let total = 0;
      const lines: { bookId: string; qty: number; unitPrice: string }[] = [];

      for (const [bookId, qty] of Object.entries(cart)) {
        const book = await manager.findOne(Book, { where: { id: bookId } });
        if (!book) {
          throw new BadRequestException('ไม่พบหนังสือในตะกร้า');
        }
        if (book.stock < qty) {
          throw new BadRequestException(`สต็อกไม่พอสำหรับ: ${book.title}`);
        }
        total += Number(book.price) * qty;
        lines.push({ bookId, qty, unitPrice: book.price });
      }

      const order = manager.create(Order, {
        userId,
        total: total.toFixed(2),
        status: OrderStatus.PENDING,
      });
      await manager.save(order);

      for (const line of lines) {
        const item = manager.create(OrderItem, {
          orderId: order.id,
          bookId: line.bookId,
          quantity: line.qty,
          unitPrice: line.unitPrice,
        });
        await manager.save(item);
        await manager.decrement(Book, { id: line.bookId }, 'stock', line.qty);
      }

      return order.id;
    });

    await this.cartService.clear(req);

    const full = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ['items', 'items.book'],
    });
    if (!full) {
      throw new BadRequestException('สร้างคำสั่งซื้อไม่สำเร็จ');
    }
    return full;
  }

  findByUser(userId: string): Promise<Order[]> {
    return this.orderRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      relations: ['items', 'items.book'],
    });
  }
}
