import { Controller, Get, Logger } from '@nestjs/common';
import { AnalyticsAPIService } from './analytics.api.service';

@Controller('')
export class AnalyticsAPIController {
  constructor(
    private readonly appService: AnalyticsAPIService,
    private readonly logger: Logger) {}
}
