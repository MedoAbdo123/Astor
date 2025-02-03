import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({ // تأكد من وجود هذا
      isGlobal: true,
      envFilePath: '.env', // اختياري إذا كنت تستخدم ملف .env
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URL'), // غيّر process.env.MONGO_URL إلى 'MONGO_URL'
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ProductsModule,
    CartModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
