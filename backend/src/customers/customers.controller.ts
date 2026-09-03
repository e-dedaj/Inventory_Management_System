import { Controller, Get, Post, Body, Delete,Param } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  getAll() {
    return this.customersService.findAll();
  }

  @Post()
  create(@Body() body: { fullName: string; phone: string; initialAmount: number }) {
    return this.customersService.create(body);
  }

  @Delete(':id')
    delete(@Param('id') id: number) {
    return this.customersService.delete(id);
  }
}