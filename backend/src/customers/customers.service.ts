import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepository.find({ relations: ['orders'] });
  }

  create(data: { fullName: string; phone: string; initialAmount: number }) {
    const customer = this.customerRepository.create(data);
    return this.customerRepository.save(customer);
  }

  async delete(id: number) {
    return this.customerRepository.delete(id);
  }
}