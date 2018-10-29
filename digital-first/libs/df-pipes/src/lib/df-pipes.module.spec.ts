import { async, TestBed } from '@angular/core/testing'
import { DfPipesModule } from './df-pipes.module'

describe('DfPipesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfPipesModule]
    }).compileComponents()
  }))

  it('should create', () => {
    expect(DfPipesModule).toBeDefined()
  })
})
