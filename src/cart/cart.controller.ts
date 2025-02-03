// cart.controller.ts
import { Controller, Get, Post, Body, Req, UseGuards, Delete, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/addToCart.dto';
import { Request } from 'express';
import { RolesGuard } from 'src/products/guard/role.guard';

@Controller('cart')
@UseGuards(RolesGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('addToCart')
  async addToCart(@Req() req: Request, @Body() addToCartDto: AddToCartDto) {
    const userId = req.user['id'];
    return this.cartService.addToCart(userId, addToCartDto);
  }

  @Get('getProductToCart')
  async getCart(@Req() req: Request) {
    const userId = req.user['id'];
    const cart = await this.cartService.getOrCreateCart(userId);
    // populate بيانات المنتجات قبل الإرجاع
    await cart.populate('items.product')
    return cart;
  }


  @Delete('remove/:productId')
  async removeProductFromCart(@Req() req: Request, @Param('productId') productId: string) {
    const userId = req.user['id'];
    return this.cartService.removeFromCart(userId, productId);
  }
}
