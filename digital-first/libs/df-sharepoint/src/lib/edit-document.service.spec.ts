import { TestBed } from '@angular/core/testing'

import { EditDocumentService } from './edit-document.service'

describe('EditDocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: EditDocumentService = TestBed.get(EditDocumentService)
    expect(service).toBeTruthy()
  })
})
