import { TestBed } from '@angular/core/testing';

import { DfAuthGuardService } from './df-auth-guard.service';

describe('DfAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DfAuthGuardService = TestBed.get(DfAuthGuardService);
    expect(service).toBeTruthy();
  });
});
