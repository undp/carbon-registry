import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AnalyticsAPIService {

  constructor(private configService: ConfigService) {
    
  }
  
  getHello(): string {
    const stage = this.configService.get<string>('stage');
    return 'Hello Analytics API :' + stage;
  }
}
