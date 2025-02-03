import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { RolesGuard } from './guard/role.guard';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('getProducts')
  async getAllProduct() {
    return this.productsService.getAllProducts()
  }
  
  @Post('addProduct')
  @UseGuards(RolesGuard)
  async addProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.addProduct(createProductDto) 
  }

  @Patch('updateProduct/:productId')
  @UseGuards(RolesGuard)
  async updateProduct(@Body() updateProductDto: UpdateProductDto,@Param('productId') productId: string) {
    return this.productsService.updateProduct(updateProductDto,productId)
  }

  @Delete('deleteProduct/:productId')
  @UseGuards(RolesGuard)
  async deleteProduct(@Param('productId') productId: string) {
    return this.productsService.deleteProduct(productId)
  }
}