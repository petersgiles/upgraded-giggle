import { TestBed } from '@angular/core/testing'

import { GetBriefByIdService } from './get-brief-by-id.service'

describe('GetBriefByIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: GetBriefByIdService = TestBed.get(GetBriefByIdService)
    expect(service).toBeTruthy()
  })
})
