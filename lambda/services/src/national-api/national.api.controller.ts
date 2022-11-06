import { Controller, Get, Logger } from '@nestjs/common';
import { NationalAPIService } from './national.api.service';

@Controller('/api/national')
export class NationalAPIController {
  constructor(private readonly appService: NationalAPIService, private readonly logger: Logger) {}

  @Get('ping')
  getHello(): string {
    this.logger.log('Hello received')
    return this.appService.getHello();
  }
}
