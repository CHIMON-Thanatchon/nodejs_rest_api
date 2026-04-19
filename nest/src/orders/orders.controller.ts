import { Controller, Get, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { OrdersService } from './orders.service';
import { JwtUserPayload } from '../common/guards/roles.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /** ต้องมี JWT — ผูกคำสั่งซื้อกับผู้ใช้ และล้างตะกร้าใน session */
  @Post('checkout')
  checkout(@Req() req: Request & { user: JwtUserPayload }) {
    return this.ordersService.checkout(req.user.id, req);
  }

  @Get('me')
  myOrders(@Req() req: Request & { user: JwtUserPayload }) {
    return this.ordersService.findByUser(req.user.id);
  }
}
