import { async, TestBed } from '@angular/core/testing'
import { DfAuthModule } from './df-auth.module'

describe('DfAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfAuthModule]
    }).compileComponents()
  }))

  it('should create', () => {
    expect(DfAuthModule).toBeDefined()
  })
})
