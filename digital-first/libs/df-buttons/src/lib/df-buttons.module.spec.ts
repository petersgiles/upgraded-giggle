import { async, TestBed } from '@angular/core/testing'
import { DfButtonsModule } from './df-buttons.module'

describe('DfButtonsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfButtonsModule]
    }).compileComponents()
  }))

  it('should create', () => {
    expect(DfButtonsModule).toBeDefined()
  })
})
