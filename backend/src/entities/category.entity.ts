import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number; // Shto !

  @Column()
  name!: string; // Shto !

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[]; // Shto !
}