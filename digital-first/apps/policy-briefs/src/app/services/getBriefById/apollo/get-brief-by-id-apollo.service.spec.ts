import { TestBed } from '@angular/core/testing';

import { GetBriefByIdApolloService } from './get-brief-by-id-apollo.service';

describe('GetBriefByIdApolloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetBriefByIdApolloService = TestBed.get(GetBriefByIdApolloService);
    expect(service).toBeTruthy();
  });
});
