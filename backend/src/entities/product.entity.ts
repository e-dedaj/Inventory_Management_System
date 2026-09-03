import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Supplier } from './supplier.entity';
import { SubProduct } from './subproduct.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column()
  stockQuantity!: number;

  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'SET NULL' })
  category!: Category;

  @ManyToOne(() => Supplier, (supplier) => supplier.products, { onDelete: 'SET NULL' })
  supplier!: Supplier;

  @OneToMany(() => SubProduct, (subProduct) => subProduct.product)
  subProducts!: SubProduct[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems!: OrderItem[];
}