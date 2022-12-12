import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AnalyticsAPIController } from "./analytics.api.controller";
import { AnalyticsAPIService } from "./analytics.api.service";
import configuration from "../shared/configuration";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "../shared/typeorm.config.service";
// import { Project } from './entities/project.entity';
import { AuthModule } from "../national-api/auth/auth.module";
import { UserModule } from "../national-api/user/user.module";
import { CaslModule } from "../shared/casl/casl.module";
import { ProjectModule } from "../national-api/project/project.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [`.env.${process.env.NODE_ENV}`, `.env`],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UserModule,
    CaslModule,
    ProjectModule,
  ],
  controllers: [AnalyticsAPIController],
  providers: [AnalyticsAPIService, Logger],
})
export class AnalyticsAPIModule {}
