import { Controller, Get } from '@nestjs/common';
import { NationalAPIService } from './national.api.service';

@Controller('/api/national')
export class NationalAPIController {
  constructor(private readonly appService: NationalAPIService) {}

  @Get('ping')
  getHello(): string {
    return this.appService.getHello();
  }
}
