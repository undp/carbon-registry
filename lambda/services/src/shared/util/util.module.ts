import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counter } from '../entities/counter.entity';
import { CounterService } from './counter.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Counter]),
  ],
  providers: [CounterService],
  exports: [CounterService]
})
export class UtilModule {}
