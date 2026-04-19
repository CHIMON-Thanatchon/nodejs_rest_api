import { Module } from '@nestjs/common';
import { BooksModule } from '../books/books.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [BooksModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
