import { TestBed } from '@angular/core/testing'

import { SharePointRestApiService } from './sharepoint-rest.service'

describe('SharePointRestApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: SharePointRestApiService = TestBed.get(SharePointRestApiService)
    expect(service).toBeTruthy()
  })
})
