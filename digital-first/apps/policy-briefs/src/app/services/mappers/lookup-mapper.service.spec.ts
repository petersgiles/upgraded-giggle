import { TestBed } from '@angular/core/testing';

import { LookupMapperService } from './lookup-mapper.service';

describe('LookupMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LookupMapperService = TestBed.get(LookupMapperService);
    expect(service).toBeTruthy();
  });
});
