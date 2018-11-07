import { async, TestBed } from '@angular/core/testing'
import { DfComponentsModule } from './df-components.module'

describe('DfComponentsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfComponentsModule]
    }).compileComponents()
  }))

  it('should create', () => {
    expect(DfComponentsModule).toBeDefined()
  })
})
