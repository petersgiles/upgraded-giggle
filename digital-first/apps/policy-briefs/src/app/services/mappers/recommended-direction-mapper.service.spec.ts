import { TestBed } from '@angular/core/testing';

import { RecommendedDirectionMapperService } from './recommended-direction-mapper.service';

describe('RecommendedDirectionMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecommendedDirectionMapperService = TestBed.get(RecommendedDirectionMapperService);
    expect(service).toBeTruthy();
  });
});
