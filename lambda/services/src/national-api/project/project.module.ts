import { Logger, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectLedgerModule } from '../../shared/project-ledger/project-ledger.module';
import { CaslModule } from '../../shared/casl/casl.module';

@Module({
  imports: [ProjectLedgerModule, CaslModule],
  providers: [Logger, ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
