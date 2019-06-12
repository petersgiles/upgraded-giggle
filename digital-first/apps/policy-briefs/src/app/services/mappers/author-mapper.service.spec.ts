import { TestBed } from '@angular/core/testing';

import { AuthorMapperService } from './author-mapper.service';

describe('AuthorMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorMapperService = TestBed.get(AuthorMapperService);
    expect(service).toBeTruthy();
  });
});
