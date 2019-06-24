import { TestBed } from '@angular/core/testing';

import { BriefNavigationMapperService } from './brief-navigation-mapper.service';

describe('BriefNavigationMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BriefNavigationMapperService = TestBed.get(BriefNavigationMapperService);
    expect(service).toBeTruthy();
  });
});
