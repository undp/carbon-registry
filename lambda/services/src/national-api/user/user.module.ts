import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../shared/entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CaslModule } from '../../shared/casl/casl.module';
import { EmailModule } from '../../shared/email/email.module';
import { TypeOrmConfigService } from '../../shared/typeorm.config.service';
import configuration from '../../shared/configuration';
import { ConfigModule } from '@nestjs/config';

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
    TypeOrmModule.forFeature([User]),
    CaslModule,
    EmailModule
  ],
  providers: [UserService, Logger],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
