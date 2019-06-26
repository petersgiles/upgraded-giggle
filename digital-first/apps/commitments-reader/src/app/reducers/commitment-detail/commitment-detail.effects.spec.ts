import { TestBed, inject } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { cold, hot } from 'jasmine-marbles'
import { Observable } from 'rxjs'

import { CommitmentDetailEffects } from './commitment-detail.effects'
import { GetDetailedCommitment, LoadCommitments, LoadDetailedCommitment } from './commitment-detail.actions'

import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing'

describe('DogComponent', () => {
  let controller: ApolloTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    })

    controller = TestBed.get(ApolloTestingController)
  })

  afterEach(() => {
    controller.verify()
  })
})

describe('CommitmentDetailEffects', () => {
  let actions$: Observable<any>
  let effects: CommitmentDetailEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommitmentDetailEffects,
        provideMockActions(() => actions$)
      ]
    })

    effects = TestBed.get(CommitmentDetailEffects)
  })

  it('should work', () => {
    const action = new GetDetailedCommitment({ id: '2'})
    const completion = new LoadDetailedCommitment('')

    // Refer to 'Writing Marble Tests' for details on '--a-' syntax
    actions$ = hot('--a-', { a: action })
    const expected = cold('--b', { b: completion })
  })
})
