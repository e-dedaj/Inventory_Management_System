import { Controller, Get, Post, Body, Delete,Param } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  getAll() {
    return this.suppliersService.findAll();
  }
  @Delete(':id')
delete(@Param('id') id: number) {
  return this.suppliersService.delete(id);
}
  @Post()
  create(@Body() body: { name: string; contactInfo: string }) {
    return this.suppliersService.create(body);
  }
}