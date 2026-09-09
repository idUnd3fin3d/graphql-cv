import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module.js';

const server = express();

let app: INestApplication | undefined;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );

    await app.init();
  }

  return app;
}

export default async function handler(
  req: Request,
  res: Response,
) {
  const nestApp = await bootstrap();

  return nestApp
    .getHttpAdapter()
    .getInstance()(req, res);
}