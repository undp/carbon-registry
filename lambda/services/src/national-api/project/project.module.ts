import { Logger, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectLedgerModule } from '../../shared/project-ledger/project-ledger.module';
import { CaslModule } from '../../shared/casl/casl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../shared/entities/project.entity';

@Module({
  imports: [ProjectLedgerModule, CaslModule, TypeOrmModule.forFeature([Project])],
  providers: [Logger, ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
