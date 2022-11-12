import { Module } from '@nestjs/common';
import { TrimPipe } from './trim-pipe.transform';
import { ValidationService } from './validation.service';

@Module({
  providers: [ValidationService, TrimPipe],
  exports: [TrimPipe]
})
export class ValidationModule {}
