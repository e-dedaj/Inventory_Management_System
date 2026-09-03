import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity'; // 1. Mos harro importin e Kategorisë!

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category) // 2. Kjo Mungonte! Duhet injektuar që NestJS ta njohë tabelën category
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Leximi me kërkim (Search) bazë
  async findAll(search?: string) {
    if (search) {
      return this.productRepository.find({
        where: { name: Like(`%${search}%`) },
        relations: ['category'], // Na kthen edhe të dhënat e kategorisë
      });
    }
    return this.productRepository.find({ relations: ['category'] });
  }

  async create(data: { name: string; price: number; stockQuantity: number; categoryName: string }) {
    // 1. Sigurohemi që emri i kategorisë nuk ka hapësira të tepërta
    const emriKerkur = data.categoryName.trim();

    // 2. Kërkojmë saktësisht në SQL Server për këtë emër
    let category = await this.categoryRepository.findOne({ 
      where: { name: emriKerkur } 
    });

    // 3. Nëse nuk ekziston fare (p.sh. hera e parë që zgjidhet 'Veshje'), e krijojmë
    if (!category) {
      category = this.categoryRepository.create({ name: emriKerkur });
      category = await this.categoryRepository.save(category);
    }

    // 4. Krijojmë produktin dhe e lidhim ekzaktesisht me këtë kategori që gjetëm/krijuam
    const product = this.productRepository.create({
      name: data.name,
      price: data.price,
      stockQuantity: data.stockQuantity,
      category: category // Kjo lidh ID-në e saktë të kategorisë në SQL Server
    });

    return this.productRepository.save(product);
  }

  async update(id: number, data: any) {
    await this.productRepository.update(id, data);
    return this.productRepository.findOne({ where: { id } });
  }

  // Raporti 1: Stoku Total dhe Vlera Totale e Inventarit
  async getInventoryReport() {
    const result = await this.productRepository.query(
      `SELECT SUM(stockQuantity) as TotalItems, SUM(price * stockQuantity) as TotalValue FROM product`
    );
    return result[0];
  }

  // Raporti 2: Produktet me stok të ulët (më pak se 5)
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
    return {
      totalItems: Number(rawStats[0]?.totalItems || 0),
      totalValue: Number(rawStats[0]?.totalValue || 0)
    };
  }

  delete(id: number) {
    return this.productRepository.delete(id);
  }
}