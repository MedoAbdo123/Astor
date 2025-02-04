import { Module, UseFilters } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    ProductsModule,
    CartModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}