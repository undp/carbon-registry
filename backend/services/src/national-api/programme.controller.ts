import { Body, Controller, Get, Post, Put, Query, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProgrammeMitigationIssue, ProgrammeService, ApiKeyJwtAuthGuard, PoliciesGuard, CheckPolicies, AppAbility, Action, Programme, ProgrammeDto, ProgrammeDocumentRegistryDto, ProgrammeAcceptedDto, MitigationAddDto, OwnershipUpdateDto, PoliciesGuardEx, QueryDto, ConstantUpdateDto, ProgrammeApprove, ProgrammeIssue, ProgrammeReject, TransferFreezeGuard, ProgrammeTransferRequest, ProgrammeRetire, ProgrammeCertify, ProgrammeRevoke, ProgrammeTransferApprove, ProgrammeTransfer, ProgrammeTransferReject, ProgrammeTransferCancel, DataExportQueryDto } from '@undp/carbon-services-lib';

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
    async addProgramme(@Body()programme: ProgrammeDto, @Request() req) {
      console.log('Programme create', programme)
      return this.programmeService.create(programme, req.user)
    }

    @ApiBearerAuth('api_key')
    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Programme))
    @Post('addDocument')
    async addDocument(@Body()document: ProgrammeDocumentRegistryDto, @Request() req) {
      return this.programmeService.addDocumentRegistry(document)
    }

    @ApiBearerAuth('api_key')
    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Programme))
    @Post('acceptProgramme')
    async acceptProgramme(@Body()acc: ProgrammeAcceptedDto) {
      return this.programmeService.programmeAccept(acc)
    }

    @ApiBearerAuth('api_key')
    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Programme))
    @Post('addMitigation')
    async addMitigation(@Body()mitigation: MitigationAddDto, @Request() req) {
      return this.programmeService.addMitigation(mitigation)
    }

    @ApiBearerAuth('api_key')
    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Programme))
    @Post('updateOwnership')
    async updateOwnership(@Body()update: OwnershipUpdateDto, @Request() req) {
      return this.programmeService.updateOwnership(update, req.user)
    }

    @ApiBearerAuth()
    @ApiBearerAuth('api_key')
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Read, Programme, true))
    // @UseGuards(JwtAuthGuard, PoliciesGuardEx(true, Action.Read, User, true))
    @Post('query')
    async getAll(@Body()query: QueryDto, @Request() req) {
      return this.programmeService.query(query, req.abilityCondition)
    }

    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Read, Programme, true))
    // @UseGuards(JwtAuthGuard, PoliciesGuardEx(true, Action.Read, User, true))
    @Post('download')
    async getDownload(@Body() query: DataExportQueryDto, @Request() req) {
      return this.programmeService.downloadProgrammes(query, req.abilityCondition); // Return the filePath as a JSON response
    }

    @ApiBearerAuth('api_key')
    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuard)
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Read, Programme, true))
    @Get('getHistory')
    async getHistory(@Query('programmeId') programmeId: string, @Request() req) {
        return this.programmeService.getProgrammeEvents(programmeId, req.user)
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
    async programmeApprove(@Body() body: ProgrammeApprove, @Request() req) {
        return this.programmeService.approveProgramme(body, req.user)
    }

    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Update, Programme))
    @Put('issue')
    async programmeIssue(@Body() body: ProgrammeMitigationIssue, @Request() req) {
        return this.programmeService.issueProgrammeCredit(body, req.user)
    }


    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Update, Programme))
    @Put('reject')
    async programmeReject(@Body() body: ProgrammeReject, @Request() req) {
        return this.programmeService.rejectProgramme(body, req.user)
    }

    @ApiBearerAuth()
    @ApiBearerAuth('api_key')
    @UseGuards(TransferFreezeGuard, ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Update, ProgrammeTransferRequest))
    @Put('retire')
    async programmeRetire(@Body() body: ProgrammeRetire, @Request() req) {
        return this.programmeService.retireProgramme(body, req.user)
    }

    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Update, ProgrammeCertify))
    @Put('certify')
    async programmeCertify(@Body() body: ProgrammeCertify, @Request() req) {
        return this.programmeService.certify(body, true, req.user)
    }

    @ApiBearerAuth()
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Update, ProgrammeCertify))
    @Put('revoke')
    async programmeRevoke(@Body() body: ProgrammeRevoke, @Request() req) {
        return this.programmeService.certify(body, false, req.user)
    }

    @ApiBearerAuth()
    @ApiBearerAuth('api_key')
    @UseGuards(TransferFreezeGuard, ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Create, ProgrammeTransferRequest))
    @Post('transferRequest')
    async transferRequest(@Body() body: ProgrammeTransferRequest, @Request() req) {
        return this.programmeService.transferRequest(body, req.user)
    }

    @ApiBearerAuth()
    @ApiBearerAuth('api_key')
    @UseGuards(TransferFreezeGuard, ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Create, ProgrammeTransferRequest))
    @Post('transferApprove')
    async transferApprove(@Body() body: ProgrammeTransferApprove, @Request() req) {
        return this.programmeService.transferApprove(body, req.user)
    }

    @ApiBearerAuth()
    @ApiBearerAuth('api_key')
    @UseGuards(TransferFreezeGuard, ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Delete, ProgrammeTransfer))
    @Post('transferReject')
    async transferReject(@Body() body: ProgrammeTransferReject, @Request() req) {
        return this.programmeService.transferReject(body, req.user)
    }

    @ApiBearerAuth()
    @ApiBearerAuth('api_key')
    @UseGuards(TransferFreezeGuard, ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Delete, ProgrammeTransfer))
    @Post('transferCancel')
    async transferCancel(@Body() body: ProgrammeTransferCancel, @Request() req) {
        return this.programmeService.transferCancel(body, req.user)
    }

    @ApiBearerAuth()
    @ApiBearerAuth('api_key')
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Read, ProgrammeTransfer, true))
    @Post('transferQuery')
    queryUser(@Body()query: QueryDto, @Request() req) {
      console.log(req.abilityCondition)
      return this.programmeService.queryProgrammeTransfers(query, req.abilityCondition, req.user)
    }

    @ApiBearerAuth()
    @UseGuards(
      ApiKeyJwtAuthGuard,
      PoliciesGuardEx(true, Action.Read, ProgrammeTransfer, true)
    )
    @Post("transfers/download")
    async getTransfersDownload(@Body() query: DataExportQueryDto, @Request() req) {
      return this.programmeService.downloadTransfers(query, req.abilityCondition, req.user); // Return the filePath as a JSON response
    }

    @ApiBearerAuth()
    @ApiBearerAuth('api_key')
    @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Read, ProgrammeTransfer, true))
    @Get('transfersByProgrammeId')
    transfersByProgrammeId(@Query('programmeId') programmeId: string, @Request() req) {
      console.log(req.abilityCondition)
      return this.programmeService.getTransferByProgrammeId(programmeId, req.abilityCondition, req.user)
    }
}