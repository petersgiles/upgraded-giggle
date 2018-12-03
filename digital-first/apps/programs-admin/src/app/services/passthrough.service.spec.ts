import { TestBed } from '@angular/core/testing';

import { PassthroughService } from './passthrough.service';

describe('PassthroughService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassthroughService = TestBed.get(PassthroughService);
    expect(service).toBeTruthy();
  });
});
