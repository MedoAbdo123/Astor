import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// استخدم require لاستدعاء الحزمة
const serverlessExpress = require('@vendia/serverless-express');

let server: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  // استدعاء الدالة من serverlessExpress وتحويل التطبيق إلى دالة Serverless
  server = serverlessExpress({ app: expressApp });
}
bootstrap();

const handler = (event: any, context: any) => {
  return server(event, context);
};

export default handler;