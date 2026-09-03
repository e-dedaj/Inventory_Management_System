import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column({ nullable: true }) // E bëjmë nullable që të mos japë gabim për të vjetrit
  phone!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  initialAmount!: number;

  @OneToMany(() => Order, (order:any) => order.customer)
  orders!: Order[];
}