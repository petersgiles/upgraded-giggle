import { TestBed } from '@angular/core/testing'

import { SharepointJsomService } from './sharepoint-jsom.service'

describe('SharepointJsomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: SharepointJsomService = TestBed.get(SharepointJsomService)
    expect(service).toBeTruthy()
  })
})
