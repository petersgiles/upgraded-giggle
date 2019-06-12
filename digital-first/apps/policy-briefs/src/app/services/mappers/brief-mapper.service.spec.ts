import { TestBed } from '@angular/core/testing';

import { BriefMapperService } from './brief-mapper.service';

describe('BriefMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BriefMapperService = TestBed.get(BriefMapperService);
    expect(service).toBeTruthy();
  });
});
