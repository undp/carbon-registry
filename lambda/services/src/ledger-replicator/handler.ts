// lambda.ts
import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { NestFactory } from '@nestjs/core';
import { LedgerReplicatorModule } from './ledger-replicator.module';
import { LedgerReplicatorService } from './ledger-replicator.service';
import { getLogger } from '../shared/server';

export const handler: Handler = async (event: any, context: Context) => {
   const app = await NestFactory.createApplicationContext(LedgerReplicatorModule, {
      logger: getLogger(LedgerReplicatorModule),
    });
    await app.get(LedgerReplicatorService).replicate(event);
}