import { TestBed } from '@angular/core/testing'

import { GetPackNavigationApolloService } from './get-pack-navigation-apollo.service'

describe('GetPackNavigationSharepointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: GetPackNavigationApolloService = TestBed.get(GetPackNavigationApolloService)
    expect(service).toBeTruthy()
  })
})
