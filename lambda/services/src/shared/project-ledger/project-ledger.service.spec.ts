import { Test, TestingModule } from '@nestjs/testing';
import { ProjectLedgerService } from './project-ledger.service';

describe('ProjectLedgerService', () => {
  let service: ProjectLedgerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectLedgerService],
    }).compile();

    service = module.get<ProjectLedgerService>(ProjectLedgerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
