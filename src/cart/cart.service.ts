import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './schema/cart.schema' 
import { AddToCartDto } from './dto/addToCart.dto'; 
@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>
  ) {}

  async getOrCreateCart(userId: string): Promise<CartDocument> {
    let cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      cart = new this.cartModel({ user: userId, items: [] });
      await cart.save();
    }
    return cart;
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<CartDocument> {
    const { productId, quantity } = addToCartDto;
    const cart = await this.getOrCreateCart(userId);
  
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
  
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: new Types.ObjectId(productId), quantity });
    }
    
    const updatedCart = await cart.save();
    await updatedCart.populate('items.product')
    
    return updatedCart;
  }

  async removeFromCart(userId: string, productId: string): Promise<CartDocument> {
    const cart = await this.getOrCreateCart(userId);

    const exists = cart.items.find(item => item.product.toString() === productId);
    if (!exists) {
      throw new NotFoundException('The product is not in the cart');
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    const updatedCart = await cart.save();

    await updatedCart.populate('items.product');
    return updatedCart;
  }
  
}