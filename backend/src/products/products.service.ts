import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity'; 
import { CustomersService } from '../customers/customers.service';
import { SuppliersService } from '../suppliers/suppliers.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private customersService: CustomersService, 
    private suppliersService: SuppliersService,

    @InjectRepository(Category) // 2. Kjo Mungonte! Duhet injektuar që NestJS ta njohë tabelën category
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(search?: string) {
    if (search) {
      return this.productRepository.find({
        where: { name: Like(`%${search}%`) },
        relations: ['category'], 
      });
    }
    return this.productRepository.find({ relations: ['category'] });
  }

  async create(data: { name: string; price: number; stockQuantity: number; categoryName: string }) {
    const emriKerkur = data.categoryName.trim();

    // 2. Kërkojmë saktësisht në SQL Server për këtë emër
    let category = await this.categoryRepository.findOne({ 
      where: { name: emriKerkur } 
    });

    if (!category) {
      category = this.categoryRepository.create({ name: emriKerkur });
      category = await this.categoryRepository.save(category);
    }

    const product = this.productRepository.create({
      name: data.name,
      price: data.price,
      stockQuantity: data.stockQuantity,
      category: category 
    });

    return this.productRepository.save(product);
  }

  async update(id: number, data: any) {
    await this.productRepository.update(id, data);
    return this.productRepository.findOne({ where: { id } });
  }

  async getInventoryReport() {
    const result = await this.productRepository.query(
      `SELECT SUM(stockQuantity) as TotalItems, SUM(price * stockQuantity) as TotalValue FROM product`
    );
    return result[0];
  }

  async getLowStock() {
    return await this.productRepository.createQueryBuilder('product')
      .where('product.stockQuantity < :limit', { limit: 5 })
      .select(['product.id', 'product.name', 'product.stockQuantity'])
      .getMany();
  }

  async getStats() {
    const rawStats = await this.productRepository.query(
      `SELECT SUM(stockQuantity) as totalItems, SUM(price * stockQuantity) as totalValue FROM product`
    );
    const customersCount = await this.customersService.count();
    const suppliersCount = await this.suppliersService.count();
    return {
      totalItems: Number(rawStats[0]?.totalItems || 0),
      totalValue: Number(rawStats[0]?.totalValue || 0),
      customers: customersCount,
      suppliers: suppliersCount,
    };
  }

  delete(id: number) {
    return this.productRepository.delete(id);
  }
}