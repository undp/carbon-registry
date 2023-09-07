// lambda.ts
import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { NestFactory } from '@nestjs/core';
import { LedgerReplicatorModule, getLogger, LedgerReplicatorInterface } from 'carbon-services-lib';

export const handler: Handler = async (event: any, context: Context) => {
   const app = await NestFactory.createApplicationContext(LedgerReplicatorModule, {
      logger: getLogger(LedgerReplicatorModule),
    });
    await app.get(LedgerReplicatorInterface).replicate(event);
}