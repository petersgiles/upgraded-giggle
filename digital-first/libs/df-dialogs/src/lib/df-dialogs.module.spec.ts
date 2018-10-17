import { async, TestBed } from '@angular/core/testing'
import { DfDialogsModule } from './df-dialogs.module'

describe('DfDialogsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfDialogsModule]
    }).compileComponents()
  }))

  it('should create', () => {
    expect(DfDialogsModule).toBeDefined()
  })
})
