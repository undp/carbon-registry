import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { Action } from '../../shared/casl/action.enum';
import { AppAbility } from '../../shared/casl/casl-ability.factory';
import { CheckPolicies } from '../../shared/casl/policy.decorator';
import { PoliciesGuard } from '../../shared/casl/policy.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../../shared/entities/user.entity';
import { UserDto } from '../../shared/dto/user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, PoliciesGuard)
    // TODO: change the policy to view self only
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
    @Get('profile')
    getProfile(@Request() req) {
      return this.userService.findOne(req.user.username);
    }
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, User))
    @Post('add')
    addUser(@Body()user: UserDto) {
      return this.userService.create(user)
    }
}
