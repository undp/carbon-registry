import { Test, TestingModule } from '@nestjs/testing';
import { GhgEmissionsService } from './ghg-emissions.service';

describe('GhgEmissionsService', () => {
  let service: GhgEmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GhgEmissionsService],
    }).compile();

    service = module.get<GhgEmissionsService>(GhgEmissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
