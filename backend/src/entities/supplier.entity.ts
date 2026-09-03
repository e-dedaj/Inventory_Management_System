import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  contactInfo!: string;

  @OneToMany(() => Product, (product) => product.supplier)
  products!: Product[];
}