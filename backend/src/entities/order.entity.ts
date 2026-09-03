import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  orderDate!: Date;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalAmount!: number;

  @ManyToOne(() => Customer, (customer) => customer.orders, { onDelete: 'CASCADE' })
  customer!: Customer;

  @OneToMany(() => OrderItem, (orderItem: any) => orderItem.order, { cascade: true })
  items!: OrderItem[];
}