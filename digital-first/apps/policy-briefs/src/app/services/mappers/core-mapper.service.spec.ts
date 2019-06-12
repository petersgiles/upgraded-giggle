import { TestBed } from '@angular/core/testing';

import { CoreMapperService } from './core-mapper.service';

describe('CoreMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoreMapperService = TestBed.get(CoreMapperService);
    expect(service).toBeTruthy();
  });
});
