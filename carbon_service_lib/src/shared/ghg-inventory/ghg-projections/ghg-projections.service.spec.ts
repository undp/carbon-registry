import { Test, TestingModule } from '@nestjs/testing';
import { GhgProjectionsService } from './ghg-projections.service';

describe('GhgProjectionsService', () => {
  let service: GhgProjectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GhgProjectionsService],
    }).compile();

    service = module.get<GhgProjectionsService>(GhgProjectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
