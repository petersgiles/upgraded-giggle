import { async, TestBed } from '@angular/core/testing'
import { DfUtilsModule } from './df-utils.module'

describe('DfUtilsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfUtilsModule]
    }).compileComponents()
  }))

  it('should create', () => {
    expect(DfUtilsModule).toBeDefined()
  })
})
