import { async, TestBed } from '@angular/core/testing'
import { DfSharepointModule } from './df-sharepoint.module'

describe('DfSharepointModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfSharepointModule]
    }).compileComponents()
  }))

  it('should create', () => {
    expect(DfSharepointModule).toBeDefined()
  })
})
