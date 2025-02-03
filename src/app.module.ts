import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL),

   AuthModule,

   ProductsModule,

   CartModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
