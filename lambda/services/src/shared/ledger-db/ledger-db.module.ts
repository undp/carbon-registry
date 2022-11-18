import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../configuration';
import { TypeOrmConfigService } from '../typeorm.config.service';
import { LedgerDbService } from './ledger-db.service';

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
  ],
  providers: [LedgerDbService, Logger],
  exports: [LedgerDbService]
})
export class LedgerDbModule {}
