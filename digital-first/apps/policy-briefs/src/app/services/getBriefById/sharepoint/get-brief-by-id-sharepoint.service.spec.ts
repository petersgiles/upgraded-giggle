import { TestBed } from '@angular/core/testing';

import { GetBriefByIdSharepointService } from './get-brief-by-id-sharepoint.service';

describe('GetBriefByIdSharepointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetBriefByIdSharepointService = TestBed.get(GetBriefByIdSharepointService);
    expect(service).toBeTruthy();
  });
});
