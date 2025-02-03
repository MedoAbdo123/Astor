import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from '@vendia/serverless-express'

let server: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  server = serverlessExpress({ app: expressApp });
}

export const handler = async (event: any, context: any) => {
  if (!server) {
    await bootstrap(); // تأكد من تهيئة السيرفر عند أول استدعاء
  }
  return server(event, context);
};