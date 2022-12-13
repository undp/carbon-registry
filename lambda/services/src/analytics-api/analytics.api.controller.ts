import {
  Controller,
  Get,
  Logger,
  Query,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ApiKeyJwtAuthGuard } from "../national-api/auth/guards/api-jwt-key.guard";
import { Action } from "../shared/casl/action.enum";
import { PoliciesGuardEx } from "../shared/casl/policy.guard";
import { Programme } from "../shared/entities/programme.entity";
import { AnalyticsAPIService } from "./analytics.api.service";

@ApiTags("Programme")
@ApiBearerAuth()
@Controller("programme")
export class AnalyticsAPIController {
  constructor(
    private analyticsService: AnalyticsAPIService,
    private readonly logger: Logger
  ) {}

  @ApiBearerAuth()
  @UseGuards(
    ApiKeyJwtAuthGuard,
    PoliciesGuardEx(true, Action.Read, Programme, true)
  )
  // @UseGuards(JwtAuthGuard, PoliciesGuardEx(true, Action.Read, User, true))
  @Get("programmesStaticDetails")
  async programmesStaticDetails(@Request() req) {
    return this.analyticsService.programmesStaticDetails(
      req?.user,
      req.abilityCondition
    );
  }
}
