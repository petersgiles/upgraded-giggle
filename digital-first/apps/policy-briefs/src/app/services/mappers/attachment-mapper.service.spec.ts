import { TestBed } from '@angular/core/testing';

import { AttachmentMapperService } from './attachment-mapper.service';

describe('AttachmentMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttachmentMapperService = TestBed.get(AttachmentMapperService);
    expect(service).toBeTruthy();
  });
});
