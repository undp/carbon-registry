import { TestBed } from '@angular/core/testing';

import { ReferenceApproachService } from './reference-approach.service';

describe('ReferenceApproachService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReferenceApproachService = TestBed.get(ReferenceApproachService);
    expect(service).toBeTruthy();
  });
});
