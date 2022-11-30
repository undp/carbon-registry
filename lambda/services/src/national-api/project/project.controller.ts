import { Body, Controller, Get, Post, Put, Query, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Project } from '../../shared/entities/project.entity';
import { Action } from '../../shared/casl/action.enum';
import { AppAbility } from '../../shared/casl/casl-ability.factory';
import { CheckPolicies } from '../../shared/casl/policy.decorator';
import { PoliciesGuard, PoliciesGuardEx } from '../../shared/casl/policy.guard';
import { ProjectDto } from '../../shared/dto/project.dto';
import { ProjectService } from './project.service';
import { ApiKeyJwtAuthGuard } from '../auth/guards/api-jwt-key.guard';
import { QueryDto } from '../../shared/dto/query.dto';
import { ConstantUpdateDto } from '../../shared/dto/constants.update.dto';
import { ProjectStatus } from '../../shared/project-ledger/project-status.enum';
import { ProjectApprove } from '../../shared/dto/project.approve';
import { ProjectReject } from '../../shared/dto/project.reject';
import { ProjectRetire } from '../../shared/dto/project.retire';

@ApiTags('Project')
@ApiBearerAuth('api_key')
@ApiBearerAuth()
@Controller('project')
export class ProjectController {

    constructor(private projectService: ProjectService) {

    }

    @ApiBearerAuth('api_key')
    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Project))
    @Post('create')
    async addProject(@Body()project: ProjectDto) {
      return this.projectService.create(project)
    }

    @ApiBearerAuth('api_key')
    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Read, Project, true))
    // @UseGuards(JwtAuthGuard, PoliciesGuardEx(true, Action.Read, User, true))
    @Get('query')
    async getAll(@Query()query: QueryDto, @Request() req) {
      return this.projectService.query(query, req.abilityCondition)
    }

    @ApiBearerAuth('api_key')
    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuard)
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Read, Project, true))
    @Get('getHistory')
    async getHistory(@Query('projectId') projectId: string) {
        return this.projectService.getProjectEvents(projectId)
    }

    @ApiBearerAuth('api_key')
    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Update, Project))
    @Post('updateConfigs')
    async updateConfigs(@Body() config: ConstantUpdateDto) {
        return this.projectService.updateCustomConstants(config.type, config);
    }

    @ApiBearerAuth('api_key')
    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Update, Project))
    @Put('authorize')
    async projectApprove(@Body() body: ProjectApprove) {
        return this.projectService.updateProjectStatus(body, ProjectStatus.AUTHORIZED, ProjectStatus.REGISTERED)
    }

    @ApiBearerAuth('api_key')
    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Update, Project))
    @Put('reject')
    async projectReject(@Body() body: ProjectReject) {
        return this.projectService.updateProjectStatus(body, ProjectStatus.REJECTED, ProjectStatus.REGISTERED)
    }

    @ApiBearerAuth('api_key')
    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Update, Project))
    @Put('retire')
    async projectRetire(@Body() body: ProjectRetire) {
        return this.projectService.updateProjectStatus(body, ProjectStatus.RETIRED, ProjectStatus.AUTHORIZED)
    }
}
