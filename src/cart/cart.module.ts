import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schema/cart.schema';
import { CartController } from './cart.controller';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Cart.name,
      schema: CartSchema
    }
  ])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
