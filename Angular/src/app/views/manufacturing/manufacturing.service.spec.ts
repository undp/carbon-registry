import { TestBed } from '@angular/core/testing';

import { ManufacturingService } from './manufacturing.service';

describe('ManufacturingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManufacturingService = TestBed.get(ManufacturingService);
    expect(service).toBeTruthy();
  });
});
