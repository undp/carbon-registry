import { GhgEmissionsService } from './ghg-emissions/ghg-emissions.service';
import { GhgProjectionsService } from './ghg-projections/ghg-projections.service';
import { forwardRef, Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CaslModule } from "../casl/casl.module";
import { UtilModule } from "../util/util.module";
import { FileHandlerModule } from "../file-handler/filehandler.module";
import { UserModule } from "../user/user.module";
import { AsyncOperationsModule } from '../async-operations/async-operations.module';
import { Emission } from '../entities/emission.entity';
import { Projection } from '../entities/projection.entity';
import { EmissionEvent } from '../entities/emission.event.entity';
import { ProjectionEvent } from '../entities/projection.event.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([Emission, Projection, EmissionEvent, ProjectionEvent]),
  CaslModule,
  UtilModule,
  FileHandlerModule,
  forwardRef(() => UserModule),
  AsyncOperationsModule,
],
  providers: [Logger, GhgEmissionsService, GhgProjectionsService],
  exports: [GhgEmissionsService, GhgProjectionsService],
})
export class GhgInventoryModule {}
