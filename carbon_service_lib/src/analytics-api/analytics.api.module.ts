import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Programme } from "../shared/entities/programme.entity";
import { ProgrammeTransfer } from "../shared/entities/programme.transfer";
import { ProgrammeTransferViewEntityQuery } from "../shared/entities/programmeTransfer.view.entity";
import { AggregateAPIService } from "./aggregate.api.service";
import { Company } from "../shared/entities/company.entity";
import configuration from "../shared/configuration";
import { AuthModule } from "../shared/auth/auth.module";
import { CaslModule } from "../shared/casl/casl.module";
import { UtilModule } from "../shared/util/util.module";
import { ProgrammeLedgerModule } from "../shared/programme-ledger/programme-ledger.module";
import { TypeOrmConfigService } from "../shared/typeorm.config.service";
import { ProgrammeController } from "./programme.controller";
import { InvestmentView } from "../shared/entities/investment.view.entity";
import { NDCActionViewEntity } from "../shared/entities/ndc.view.entity";
import { GHGInventoryController } from "./ghg-inventory.controller";
import { Emission } from "src/shared/entities/emission.entity";
import { Projection } from "src/shared/entities/projection.entity";
import { EventLog } from "src/shared/entities/event.log.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [`.env.${process.env.NODE_ENV}`, `.env`],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      imports: undefined,
    }),
    TypeOrmModule.forFeature([
      Programme,
      ProgrammeTransfer,
      ProgrammeTransferViewEntityQuery,
      Company,
      NDCActionViewEntity,
      InvestmentView,
      Emission,
      Projection,
      EventLog
    ]),
    AuthModule,
    CaslModule,
    UtilModule,
    ProgrammeLedgerModule,
  ],
  controllers: [ProgrammeController, GHGInventoryController],
  providers: [Logger, AggregateAPIService],
})
export class AnalyticsAPIModule {}
