import { Controller, Get, Post, UseGuards, Request, Logger } from '@nestjs/common';
import { Action } from '../../shared/casl/action.enum';
import { AppAbility } from '../../shared/casl/casl-ability.factory';
import { CheckPolicies } from '../../shared/casl/policy.decorator';
import { PoliciesGuard } from '../../shared/casl/policy.guard';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
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
