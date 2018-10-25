import { async, TestBed } from '@angular/core/testing'
import { DfThemeModule } from './df-theme.module'

describe('DfThemeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfThemeModule]
    }).compileComponents()
  }))

  it('should create', () => {
    expect(DfThemeModule).toBeDefined()
  })
})
