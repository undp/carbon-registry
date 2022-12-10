import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../../shared/entities/company.entity';
import { CaslModule } from '../../shared/casl/casl.module';
import configuration from '../../shared/configuration';
import { EmailModule } from '../../shared/email/email.module';
import { TypeOrmConfigService } from '../../shared/typeorm.config.service';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [`.env.${process.env.NODE_ENV}`, `.env`]
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Company]),
    CaslModule,
    EmailModule
  ],
  providers: [CompanyService, Logger],
  exports: [CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule {}
