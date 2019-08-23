import { TestBed } from '@angular/core/testing';

import { RecommendationResponseMapperService } from './recommendation-response-mapper.service';

describe('RecommendationResponseMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecommendationResponseMapperService = TestBed.get(RecommendationResponseMapperService);
    expect(service).toBeTruthy();
  });
});
