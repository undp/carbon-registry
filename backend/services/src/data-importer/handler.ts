// lambda.ts
import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { NestFactory } from '@nestjs/core';
import { DataImporterModule, getLogger, DataImporterService } from '@undp/carbon-services-lib';

export const handler: Handler = async (event: any, context: Context) => {
   const app = await NestFactory.createApplicationContext(DataImporterModule, {
      logger: getLogger(DataImporterModule),
    });
    await app.get(DataImporterService).importData(event);
}