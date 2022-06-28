import { TestBed } from '@angular/core/testing';

import { ElectricityGenerationService } from './electricity-generation.service';

describe('ElectricityGenerationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectricityGenerationService = TestBed.get(ElectricityGenerationService);
    expect(service).toBeTruthy();
  });
});
