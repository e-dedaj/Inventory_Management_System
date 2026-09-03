import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

// Importet e entiteteve
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { SubProduct } from './entities/subproduct.entity';
import { Supplier } from './entities/supplier.entity';
import { Customer } from './entities/customer.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

// Importet e moduleve të reja që krijuam për Ditën 2
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { StockCheckTask } from './products/stock-check.task';

import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [
    DiscoveryModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule,SuppliersModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || '1433', 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Category, Product, SubProduct, Supplier, Customer, Order, OrderItem],
        synchronize: true,
        options: {
          encrypt: false,
        },
      }),
    }),
    // REGJISTRIMI I MODULEVE QË MUNGONIN KËTU:
    AuthModule,
    ProductsModule,
    CustomersModule,
    OrdersModule,
  ],
  providers: [StockCheckTask], // Aktivizon Taskun në background
})
export class AppModule {}