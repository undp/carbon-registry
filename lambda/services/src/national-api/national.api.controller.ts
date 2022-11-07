import { Controller, Get, Logger, Post, UseGuards, Request } from '@nestjs/common';
import { Action } from '../shared/casl/action.enum';
import { AppAbility } from '../shared/casl/casl-ability.factory';
import { CheckPolicies } from '../shared/casl/policy.decorator';
import { PoliciesGuard } from '../shared/casl/policy.guard';
// import { Role } from 'src/shared/casl/role.enum';
// import { Roles } from 'src/shared/rbac/roles.decorator';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { NationalAPIService } from './national.api.service';
import { User } from './user/user.entity';

@Controller('/api/national')
export class NationalAPIController {
  constructor(
    private readonly appService: NationalAPIService, 
    private readonly authService: AuthService, 
    private readonly logger: Logger) {}

  @Get('ping')
  // @Roles(Role.Root)
  getHello(): string {
    this.logger.log('Hello received')
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    this.logger.log('Login request received', req)
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
