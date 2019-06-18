import { TestBed } from '@angular/core/testing';

import { RecommendationMapperService } from './recommendation-mapper.service';

describe('RecommendationMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecommendationMapperService = TestBed.get(RecommendationMapperService);
    expect(service).toBeTruthy();
  });
});
