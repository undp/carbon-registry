import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NationalAPIController } from './national.api.controller';
import { NationalAPIService } from './national.api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Programme } from './entities/programme.entity';
import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { ProgrammeController } from './programme.controller';
import { SettingsController } from './settings.controller';
import { configuration, TypeOrmConfigService, AuthModule, UserModule, CaslModule, ProgrammeModule, CompanyModule, UtilModule } from 'carbon-services-lib';
import { CompanyController } from './company.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration.default],
      envFilePath: [`.env.${process.env.NODE_ENV}`, `.env`]
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      imports: undefined
    }),
    AuthModule,
    UserModule,
    CaslModule,
    ProgrammeModule,
    CompanyModule,
    UtilModule
  ],
  controllers: [ NationalAPIController, UserController, AuthController, CompanyController, ProgrammeController, SettingsController ],
  providers: [
    NationalAPIService, 
    Logger
  ],
})
export class NationalAPIModule {}
