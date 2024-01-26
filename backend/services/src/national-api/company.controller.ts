import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
  Post,
  Put,
  HttpException,
  HttpStatus,
  Body,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CompanyService, CountryService, ApiKeyJwtAuthGuard, CaslAbilityFactory, HelperService, JwtAuthGuard, PoliciesGuardEx, Action, Company, QueryDto, OrganisationSuspendDto, FindOrganisationQueryDto, OrganisationUpdateDto, DataExportQueryDto, OrganisationDuplicateCheckDto, Investment,InvestmentSyncDto } from "@undp/carbon-services-lib";


@ApiTags("Organisation")
@ApiBearerAuth()
@Controller("organisation")
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly countryService: CountryService,
    private caslAbilityFactory: CaslAbilityFactory,
    private helperService: HelperService
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuardEx(true, Action.Read, Company, true))
  @Post("query")
  query(@Body() query: QueryDto, @Request() req) {
    console.log(req.abilityCondition);
    return this.companyService.query(query, req.abilityCondition, req.user.companyRole);
  }

  @ApiBearerAuth()
  @ApiBearerAuth('api_key')
  @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Read, Company, true))
  @Post("queryNames")
  queryNames(@Body() query: QueryDto, @Request() req) {
    console.log(req.abilityCondition);
    return this.companyService.queryNames(query, req.abilityCondition);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuardEx(true, Action.Read, Company, true))
  @Post('download')
  async getDownload(@Body()query: DataExportQueryDto, @Request() req) {
    return this.companyService.download(query, req.abilityCondition, req.user.companyRole); // Return the filePath as a JSON response
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuardEx(true, Action.Delete, Company))
  @Put("suspend")
  suspend(
    @Query("id") companyId: number,
    @Body() body: OrganisationSuspendDto,
    @Request() req
  ) {
    if (companyId == req.user.companyId) {
      throw new HttpException(
        this.helperService.formatReqMessagesString(
          "company.cantSuspendUrOwn",
          []
        ),
        HttpStatus.FORBIDDEN
      );
    }
    return this.companyService.suspend(
      companyId,
      req.user,
      body.remarks,
      req.abilityCondition
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuardEx(true, Action.Delete, Company))
  @Put("activate")
  revoke(
    @Query("id") companyId: number,
    @Body() body: OrganisationSuspendDto,
    @Request() req
  ) {
    if (companyId == req.user.companyId) {
      throw new HttpException(
        this.helperService.formatReqMessagesString(
          "company.cantActivateUrOwn",
          []
        ),
        HttpStatus.FORBIDDEN
      );
    }
    return this.companyService.activate(
      companyId,
      req.user,
      body.remarks,
      req.abilityCondition
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuardEx(true, Action.Approve, Company))
  @Put("approve")
  approve(
    @Query("id") companyId: number,
    @Body() body: OrganisationSuspendDto,
    @Request() req
  ) {
    return this.companyService.approve(
      companyId,
      req.abilityCondition
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuardEx(true, Action.Reject, Company))
  @Put("reject")
  reject(
    @Query("id") companyId: number,
    @Body() body: OrganisationSuspendDto,
    @Request() req
  ) {
    return this.companyService.reject(
      companyId,
      req.user,
      body.remarks,
      req.abilityCondition
    );
  }

  @ApiBearerAuth()
  @ApiBearerAuth('api_key')
  @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Read, Company))
  @Post("findByIds")
  async findByCompanyId(
    @Body() body: FindOrganisationQueryDto,
    @Request() req
  ) {
    return this.companyService.findByCompanyIds(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getCompany(@Query("id") companyId: number, @Request() req) {
    return await this.companyService.findByCompanyId(companyId);
  }

  @ApiBearerAuth()
  @ApiBearerAuth('api_key')
  @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Update, Company))
  @Put("update")
  async updateCompany(@Body() company: OrganisationUpdateDto, @Request() req) {
    global.baseUrl = `${req.protocol}://${req.get("Host")}`;
    return await this.companyService.update(company, req.abilityCondition);
  }


  @ApiBearerAuth()
  @ApiBearerAuth('api_key')
  @UseGuards(ApiKeyJwtAuthGuard)
  @Post("countries")
  async getCountries(@Body() query: QueryDto, @Request() req) {
    return await this.countryService.getCountryList(query);
  }

  @ApiBearerAuth()
  @ApiBearerAuth('api_key')
  @UseGuards(ApiKeyJwtAuthGuard)
  @Get("countries")
  async getAvailableCountries(@Request() req) {
    return await this.countryService.getAvailableCountries();
  }

  @ApiBearerAuth()
  @ApiBearerAuth('api_key')
  @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Create, Company))
  @Post('addInvestment')
  async addInvestment(@Body() investment: InvestmentSyncDto, @Request() req) {
    return await this.companyService.addInvestmentOnLedger(investment); 
  }

  @Post("regions")
  async getRegionList(@Body() query: QueryDto, @Request() req) {
    return await this.countryService.getRegionList(query);
  }
  
  @ApiBearerAuth('api_key')
  @ApiBearerAuth()
  @UseGuards(ApiKeyJwtAuthGuard, PoliciesGuardEx(true, Action.Read, Company))
  @Post('exists')
  async checkCompanyExist(@Body() organisationDuplicateCheckDto: OrganisationDuplicateCheckDto) {
    return this.companyService.findCompanyByTaxIdPaymentIdOrEmail(organisationDuplicateCheckDto);
  }

}
