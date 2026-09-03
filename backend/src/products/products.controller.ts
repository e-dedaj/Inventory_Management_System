import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto'; // Shto këtë import

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(@Query('search') search: string) {
    return this.productsService.findAll(search);
  }

  @Post()
  create(@Body() body: { name: string; price: number; stockQuantity: number; categoryName: string }) {
    return this.productsService.create(body);
}

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(id);

  }
  @Get('stats')
getStats() {
  return this.productsService.getStats();
}

@Get('low-stock')
getLowStock() {
  return this.productsService.getLowStock();
}
}