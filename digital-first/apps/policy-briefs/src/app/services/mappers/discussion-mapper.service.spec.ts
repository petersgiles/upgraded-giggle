import { TestBed } from '@angular/core/testing';

import { DiscussionMapperService } from './discussion-mapper.service';

describe('DiscussionMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscussionMapperService = TestBed.get(DiscussionMapperService);
    expect(service).toBeTruthy();
  });
});
