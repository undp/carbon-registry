import { Logger, Module } from '@nestjs/common';
import { ProgrammeService } from './programme.service';
import { ProgrammeController } from './programme.controller';
import { ProgrammeLedgerModule } from '../../shared/programme-ledger/programme-ledger.module';
import { CaslModule } from '../../shared/casl/casl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programme } from '../../shared/entities/programme.entity';
import { UtilModule } from '../../shared/util/util.module';
import { ConstantEntity } from '../../shared/entities/constants.entity';

@Module({
  imports: [ProgrammeLedgerModule, CaslModule, TypeOrmModule.forFeature([Programme]), TypeOrmModule.forFeature([ConstantEntity]), UtilModule],
  providers: [Logger, ProgrammeService],
  controllers: [ProgrammeController]
})
export class ProgrammeModule {}

