import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../shared/entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CaslModule } from '../../shared/casl/casl.module';
import { EmailModule } from 'src/shared/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CaslModule,
    EmailModule
  ],
  providers: [UserService, Logger],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
