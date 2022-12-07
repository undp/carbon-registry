import { Test, TestingModule } from '@nestjs/testing';
import { LedgerDbService } from './ledger-db.service';

describe('LedgerDbService', () => {
  let service: LedgerDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LedgerDbService],
    }).compile();

    service = module.get<LedgerDbService>(LedgerDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
