import { TestBed } from '@angular/core/testing'

import { GetPackNavigationSharepointService } from './get-pack-navigation-sharepoint.service'

describe('GetPackNavigationSharepointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: GetPackNavigationSharepointService = TestBed.get(GetPackNavigationSharepointService)
    expect(service).toBeTruthy()
  })
})
