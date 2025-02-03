import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// استخدام require بدلاً من import الافتراضي
const serverlessExpress = require('@vendia/serverless-express');

let server: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  // استخدم serverlessExpress كدالة وتمرير كائن الخيارات مع الخاصية app
  server = serverlessExpress({ app: expressApp });
}
bootstrap();

export const handler = (event: any, context: any) => {
  return server(event, context);
};