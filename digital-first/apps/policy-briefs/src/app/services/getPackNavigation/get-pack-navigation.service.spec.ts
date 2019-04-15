import { TestBed } from '@angular/core/testing'

import { GetPackNavigationService } from './get-pack-navigation.service'

describe('GetPackNavigationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: GetPackNavigationService = TestBed.get(GetPackNavigationService)
    expect(service).toBeTruthy()
  })
})
