import { async, TestBed, inject } from '@angular/core/testing'
import { configureTests } from '../../../../../../libs/df-testing'
import { Store } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Observable, of } from 'rxjs'
import { skip, take } from 'rxjs/operators'
import { provideMockActions } from '@ngrx/effects/testing'
import { CommitmentDetailEffects } from './commitment-detail.effects'
import { cold, hot } from 'jasmine-marbles'
import {
  GetDetailedCommitment,
  UpdatePMOHandlingAdvice
} from './commitment-detail.actions'
import {
  LoadDetailedCommitment,
  GetHandlingAdvices,
  SetPMOHandlingAdviceResult,
  LoadHandlingAdvices
} from './commitment-detail.actions'

import {
  GetCommitmentDetailGQL,
  BookType,
  GetHandlingAdvicesGQL,
  UpdatePmoHandlingAdviceCommitmentGQL
} from '../../generated/graphql'
import { AppNotification } from '../../../../../../libs/df-app-core/src/lib/reducers/app/app.actions'

import {
  ApolloTestingModule,
  ApolloTestingController
} from 'apollo-angular/testing'

describe('OverviewEffects', () => {
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let commitmentDetailsEffects: CommitmentDetailEffects
  let backend: ApolloTestingController

  const initialState = {
    app: {
      config: {
        webId: 'C9013762-2FED-49D7-8EA2-1DD650C7010E',
        siteId: '52233101-86F9-46D7-BBC0-22139AF854EE',
        header: { bookType: BookType.Red }
      }
    },
    commitment: getCommitment().commitmentDetail.commitment,
    loaded: false,
    handlingAdvices: [],
    errors: [{ message: '', code: '', data: null }],
    user: {
      isSiteAdmin: true,
      login: 'guest',
      name: 'Guest User',
      roles: ['ROLE_OWNERS'],
      systemUserKey: 'guest',
      userid: 0
    },
    operationDefaults: {
      displayorder: 'hide',
      planner: 'hide',
      pmchandlingadvice: 'write',
      pmohandlingadvice: 'write'
    },
    operations: {
      ROLE_MEMBERS: [{ pmchandlingadvice: 'read', pmohandlingadvice: 'read' }],
      ROLE_OWNERS: [{ pmchandlingadvice: 'write', pmohandlingadvice: 'write' }],
      ROLE_VISITORS: [{ pmchandlingadvice: 'hide', pmohandlingadvice: 'hide' }]
    }
  }

  beforeEach(async(() => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [ApolloTestingModule],
        providers: [
          CommitmentDetailEffects,
          provideMockActions(() => actions$),
          provideMockStore({ initialState })
        ]
      })
    }
    configureTests(configure).then(testBed => {
      mockStore = testBed.get(Store)
      commitmentDetailsEffects = testBed.get(CommitmentDetailEffects)
      backend = testBed.get(ApolloTestingController)
    })
  }))

  afterEach(() => {
    // backend.verify() //ensure there are no open operations
  })

  it('should be created', () => {
    expect(commitmentDetailsEffects).toBeTruthy()
  })

  it('should dispatch a GetDetailedCommitment id', () => {
    const action = new GetDetailedCommitment({ id: 20 })
    mockStore.scannedActions$
      .pipe(skip(1))
      .subscribe(scannedAction => expect(scannedAction).toEqual(action))
    mockStore.dispatch(action)
  })

  it('should set the initial state to a mocked one', () => {
    mockStore.setState(initialState)
    mockStore.pipe(take(1)).subscribe({
      next(val) {
        expect(val).toEqual(initialState)
      }
    })
  })

  it('should load commitment', inject(
    [GetCommitmentDetailGQL],
    (getCommitmentGQL: GetCommitmentDetailGQL) => {
      let item = {
        data: { commitment: getGQLCommitment().commitmentDetail.commitment }
      }
      let result = getCommitment().commitmentDetail.commitment
      const action = new GetDetailedCommitment({ id: 20 })
      actions$ = hot('-a', { a: action })
      const expected = cold('-(bc)', {
        b: new LoadDetailedCommitment(result),
        c: new GetHandlingAdvices()
      })
      spyOn(getCommitmentGQL, 'fetch').and.returnValue(of(item))

      expect(commitmentDetailsEffects.loadCommitmentDetails$).toBeObservable(
        expected
      )
    }
  ))

  it('should load handling advices', inject(
    [GetHandlingAdvicesGQL],
    (getHandlingAdvicesGQL: GetHandlingAdvicesGQL) => {
      let advices = getHandlingAdvices().data.handlingAdvices
      const action = new GetHandlingAdvices()
      actions$ = hot('-a', { a: action })
      const expected = cold('-b', { b: new LoadHandlingAdvices({ advices }) })
      spyOn(getHandlingAdvicesGQL, 'fetch').and.returnValue(
        of(getHandlingAdvices())
      )

      expect(commitmentDetailsEffects.getHandlingAdvices$).toBeObservable(
        expected
      )
    }
  ))

  it('should update PMO handling Advice', inject(
    [UpdatePmoHandlingAdviceCommitmentGQL],
    (updatePMOHandlingAdvicesGQL: UpdatePmoHandlingAdviceCommitmentGQL) => {
      mockStore.setState({
        app: {
          config: {
            webId: 'C9013762-2FED-49D7-8EA2-1DD650C7010E',
            siteId: '52233101-86F9-46D7-BBC0-22139AF854EE',
            header: { bookType: BookType.Red }
          }
        },
        commitmentDetail: {
          commitment: getCommitment().commitmentDetail.commitment,
          handlingAdvices: getHandlingAdvices().data.handlingAdvices
        }
      })

      let advice = getHandlingAdvices().data.handlingAdvices[0]
      const action = new UpdatePMOHandlingAdvice({
        handlingAdviceId: '5f29b516-4734-4a8a-a456-402501a7b096'
      })
      actions$ = hot('-a', { a: action })
      const expected = cold('-(bc)', {
        b: new SetPMOHandlingAdviceResult({ handlingAdvice: advice }),
        c: new AppNotification({ message: `PMO Handling Advice Saved` })
      })
      spyOn(updatePMOHandlingAdvicesGQL, 'mutate').and.returnValue(
        of({
          data: {
            updatePmoHandlingAdviceCommitment: {
              id: 'da70b0d8-1cc7-476e-8def-b42c5ee7795f',
              __typename: 'MutationResultGraph'
            }
          }
        })
      )

      expect(commitmentDetailsEffects.updatePMOHandlingAdvice$).toBeObservable(
        expected
      )
    }
  ))
})

function getGQLCommitment() {
  const data = {
    commitmentDetail: {
      commitment: {
        announcedBy: null,
        announcementType: { title: 'Speech' },
        bookType: 'Red',
        commitmentType: { title: 'International' },
        cost: null,
        criticalDate: undefined,
        date: '2018-10-29T00:00:00+11:00',
        description:
          'Labor has committed to establish a new Australian government-backed infrastructure investment bank offering concessional loans and financing for vital, nation-building infrastructure in the Pacific Islands region.&nbsp;',
        commitmentLocations: [],
        id: 20,
        title: '',
        status: '',
        politicalParty: 'ALP',
        pmcHandlingAdviceCommitments: [
          {
            handlingAdvice: {
              label: 'Minister to write back to Prime Minister',
              value: '7d7329af-08a0-4742-89d3-6660b1b35280'
            },
            siteId: '52233101-86f9-46d7-bbc0-22139af854ee',
            webId: 'c9013762-2fed-49d7-8ea2-1dd650c7010e'
          }
        ],
        pmoHandlingAdviceCommitments: []
      }
    }
  }
  return data
}

function getCommitment() {
  const data = {
    commitmentDetail: {
      commitment: {
        announcedBy: null,
        announcementType: 'Speech',
        bookType: 'Red',
        commitmentType: 'International',
        cost: null,
        criticalDate: '',
        date: '2018-10-29T00:00:00+11:00',
        description:
          'Labor has committed to establish a new Australian government-backed infrastructure investment bank offering concessional loans and financing for vital, nation-building infrastructure in the Pacific Islands region.&nbsp;',
        electorates: [],
        id: 20,
        title: '',
        status: '',
        politicalParty: 'ALP',
        portfolio: '',
        pmcHandlingAdvice: {
          label: 'Minister to write back to Prime Minister',
          value: '7d7329af-08a0-4742-89d3-6660b1b35280'
        },
        pmoHandlingAdvice: { label: ' ', value: ' ' }
      }
    }
  }
  return data
}

function getHandlingAdvices() {
  const data = {
    data: {
      handlingAdvices: [
        {
          value: '5f29b516-4734-4a8a-a456-402501a7b096',
          label: 'Cabinet'
        },
        {
          value: 'f946e9cb-6e73-433d-998d-549d9ac8b5df',
          label: 'Budget Process'
        },
        {
          value: '7d7329af-08a0-4742-89d3-6660b1b35280',
          label: 'Minister to write back to Prime Minister'
        },
        {
          value: 'ee5ba805-8eb4-4031-9528-c40f48e76c55',
          label: 'Minister to implement'
        }
      ]
    }
  }
  return data
}
