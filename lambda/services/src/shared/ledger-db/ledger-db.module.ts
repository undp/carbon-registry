import { Logger, Module } from '@nestjs/common';
import { LedgerDbService } from './ledger-db.service';

@Module({
  providers: [LedgerDbService, Logger],
  exports: [LedgerDbService]
})
export class LedgerDbModule {}
