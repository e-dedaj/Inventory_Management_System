import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity'; 
import { CustomersModule } from '../customers/customers.module';
import { SuppliersModule } from '../suppliers/suppliers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]),CustomersModule,SuppliersModule], 
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}