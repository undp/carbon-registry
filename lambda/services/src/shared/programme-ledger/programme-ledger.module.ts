import { Module, Logger } from '@nestjs/common';
import { LedgerDbModule } from '../ledger-db/ledger-db.module';
import { ProgrammeLedgerService } from './programme-ledger.service';

@Module({
    imports: [LedgerDbModule],
    providers: [ProgrammeLedgerService, Logger],
    exports: [ProgrammeLedgerService]
})
export class ProgrammeLedgerModule {}
