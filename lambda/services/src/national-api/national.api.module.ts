import { Module } from '@nestjs/common';
import { NationalAPIController } from './national.api.controller';
import { NationalAPIService } from './national.api.service';

@Module({
  imports: [],
  controllers: [NationalAPIController],
  providers: [NationalAPIService],
})
export class NationalAPIModule {}
