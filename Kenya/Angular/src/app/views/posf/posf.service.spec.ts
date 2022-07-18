import { TestBed } from '@angular/core/testing';

import { PosfService } from './posf.service';

describe('PosfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PosfService = TestBed.get(PosfService);
    expect(service).toBeTruthy();
  });
});
