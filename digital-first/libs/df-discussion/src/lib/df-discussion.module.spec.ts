import { async, TestBed } from '@angular/core/testing'
import { DfDiscussionModule } from './df-discussion.module'

describe('DfDiscussionModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DfDiscussionModule]
    }).compileComponents()
  }))

  it('should create', () => {
    expect(DfDiscussionModule).toBeDefined()
  })
})
