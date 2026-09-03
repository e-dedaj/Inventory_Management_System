import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  findAll() {
    return this.supplierRepository.find();
  }

  create(data: { name: string; contactInfo: string }) {
    const supplier = this.supplierRepository.create(data);
    return this.supplierRepository.save(supplier);
  }
  async delete(id: number) {
  return this.supplierRepository.delete(id);
}
}