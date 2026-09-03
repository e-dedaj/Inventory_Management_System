import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity('SubProducts')
export class SubProduct {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  attributeName!: string; // p.sh. 'Ngjyra' ose 'Madhësia'

  @Column()
  attributeValue!: string; // p.sh. 'E zezë' ose 'XL'

  @ManyToOne(() => Product, (product) => product.subProducts, { onDelete: 'CASCADE' })
  product!: Product;
}