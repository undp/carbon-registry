import { Body, Controller, Get, Post, Put, Query, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Programme } from '../../shared/entities/programme.entity';
import { Action } from '../../shared/casl/action.enum';
import { AppAbility } from '../../shared/casl/casl-ability.factory';
import { CheckPolicies } from '../../shared/casl/policy.decorator';
import { PoliciesGuard, PoliciesGuardEx } from '../../shared/casl/policy.guard';
import { ProgrammeDto } from '../../shared/dto/programme.dto';
import { ProgrammeService } from './programme.service';
import { QueryDto } from '../../shared/dto/query.dto';
import { ConstantUpdateDto } from '../../shared/dto/constants.update.dto';
import { ProgrammeStage } from '../../shared/programme-ledger/programme-status.enum';
import { ProgrammeApprove } from '../../shared/dto/programme.approve';
import { ProgrammeReject } from '../../shared/dto/programme.reject';
import { ProgrammeRetire } from '../../shared/dto/programme.retire';
import { ApiKeyJwtAuthGuard } from '../auth/guards/api-jwt-key.guard';

@ApiTags('Programme')
@ApiBearerAuth()
@Controller('programme')
export class ProgrammeController {

    constructor(private programmeService: ProgrammeService) {

    }

    @ApiBearerAuth('api_key')
    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Programme))
    @Post('create')
    async addProgramme(@Body()programme: ProgrammeDto) {
      return this.programmeService.create(programme)
    }

    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Read, Programme, true))
    // @UseGuards(JwtAuthGuard, PoliciesGuardEx(true, Action.Read, User, true))
    @Get('query')
    async getAll(@Query()query: QueryDto, @Request() req) {
      return this.programmeService.query(query, req.abilityCondition)
    }

    @ApiBearerAuth('api_key')
    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuard)
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Read, Programme, true))
    @Get('getHistory')
    async getHistory(@Query('programmeId') programmeId: string) {
        return this.programmeService.getProgrammeEvents(programmeId)
    }

    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Update, Programme))
    @Post('updateConfigs')
    async updateConfigs(@Body() config: ConstantUpdateDto) {
        return this.programmeService.updateCustomConstants(config.type, config);
    }

    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Update, Programme))
    @Put('authorize')
    async programmeApprove(@Body() body: ProgrammeApprove) {
        return this.programmeService.updateProgrammeStatus(body, ProgrammeStage.ISSUED, ProgrammeStage.AWAITING_AUTHORIZATION)
    }

    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Update, Programme))
    @Put('reject')
    async programmeReject(@Body() body: ProgrammeReject) {
        return this.programmeService.updateProgrammeStatus(body, ProgrammeStage.REJECTED, ProgrammeStage.AWAITING_AUTHORIZATION)
    }

    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Update, Programme))
    @Put('retire')
    async programmeRetire(@Body() body: ProgrammeRetire) {
        return this.programmeService.updateProgrammeStatus(body, ProgrammeStage.RETIRED, ProgrammeStage.ISSUED)
    }
}
