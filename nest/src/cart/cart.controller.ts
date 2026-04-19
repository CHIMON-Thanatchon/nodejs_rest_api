import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Public } from '../common/decorators/public.decorator';

/**
 * ตะกร้าเก็บใน session (และ session row ใน PostgreSQL)
 * — ผู้ใช้แขกหรือสมาชิกใช้รายการค้างได้เหมือนกันจนกว่าจะเช็คเอาต์หรือล้างตะกร้า
 */
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Public()
  @Get()
  getCart(@Req() req: Request) {
    return this.cartService.getCart(req);
  }

  @Public()
  @Post('items')
  addItem(@Req() req: Request, @Body() dto: AddCartItemDto) {
    return this.cartService.addItem(req, dto.bookId, dto.quantity);
  }

  @Public()
  @Patch('items/:bookId')
  updateItem(
    @Req() req: Request,
    @Param('bookId', ParseUUIDPipe) bookId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.setQuantity(req, bookId, dto.quantity);
  }

  @Public()
  @Delete('items/:bookId')
  removeItem(@Req() req: Request, @Param('bookId', ParseUUIDPipe) bookId: string) {
    return this.cartService.removeItem(req, bookId);
  }

  @Public()
  @Delete()
  clear(@Req() req: Request) {
    return this.cartService.clear(req);
  }
}
