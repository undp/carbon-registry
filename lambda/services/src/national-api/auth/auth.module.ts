import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { CaslModule } from '../../shared/casl/casl.module';
import { ApiKeyStrategy } from './strategies/apikey.strategy';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get<string>('jwt.userSecret'),
        signOptions: {
            expiresIn: 3600,
        },
      }),
      inject: [ConfigService],
    }),
    CaslModule,
    CompanyModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ApiKeyStrategy, Logger],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
