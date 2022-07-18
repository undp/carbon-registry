import { TestBed } from '@angular/core/testing';

import { MyApprovalsService } from './my-approvals.service';

describe('MyApprovalsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyApprovalsService = TestBed.get(MyApprovalsService);
    expect(service).toBeTruthy();
  });
});
