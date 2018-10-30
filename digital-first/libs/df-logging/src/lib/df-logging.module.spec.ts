import { async, TestBed } from '@angular/core/testing'
import { DfLoggingModule } from './df-logging.module'

describe('DfLoggingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfLoggingModule]
    }).compileComponents()
  }))

  it('should create', () => {
    expect(DfLoggingModule).toBeDefined()
  })
})
