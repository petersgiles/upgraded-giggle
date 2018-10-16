import { TestBed } from '@angular/core/testing'

import { FullLayoutService } from './full-layout.service'

describe('FullLayoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: FullLayoutService = TestBed.get(FullLayoutService)
    expect(service).toBeTruthy()
  })
})
