import { Module, Logger } from '@nestjs/common';
import { LedgerDbModule } from '../ledger-db/ledger-db.module';
import { ProjectLedgerService } from './project-ledger.service';

@Module({
    imports: [LedgerDbModule],
    providers: [ProjectLedgerService, Logger]
})
export class ProjectLedgerModule {}
