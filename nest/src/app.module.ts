import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validationSchema } from './config/env.validation';
import { normalizeEnvValue } from './config/env.util';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { User } from './entities/user.entity';
import { Book } from './entities/book.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
        convert: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: normalizeEnvValue(config.get<string>('DB_HOST')),
        port: config.get<number>('DB_PORT') ?? 5432,
        username: normalizeEnvValue(config.get<string>('DB_USER')),
        password: normalizeEnvValue(config.get<string>('DB_PASSWORD')),
        database: normalizeEnvValue(config.get<string>('DB_NAME')),
        entities: [User, Book, Order, OrderItem],
        synchronize: config.get<string>('NODE_ENV') !== 'production',
        logging: config.get<string>('NODE_ENV') === 'development',
      }),
    }),
    UsersModule,
    AuthModule,
    BooksModule,
    CartModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
