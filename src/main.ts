// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

// إنشاء كائن Express
const server = express();

async function bootstrap() {
  // إنشاء تطبيق Nest باستخدام Express Adapter
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  
  // تمكين CORS إذا كنت بحاجة له
  app.enableCors();

  // تهيئة التطبيق دون الاستماع لمنفذ منفصل
  await app.init();
}

bootstrap();

// تصدير الـ Express server كـ request listener
export default server;