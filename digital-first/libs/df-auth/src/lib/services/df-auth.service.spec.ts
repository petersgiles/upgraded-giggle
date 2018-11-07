import { TestBed } from '@angular/core/testing';

import { DfAuthService } from './df-auth.service';

describe('DfAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DfAuthService = TestBed.get(DfAuthService);
    expect(service).toBeTruthy();
  });
});
