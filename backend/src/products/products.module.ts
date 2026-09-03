import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity'; // Importo këtë

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])], // Shto Category këtu brenda masivit []
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}