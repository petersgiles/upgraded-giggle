import { async, TestBed, inject } from '@angular/core/testing'
import { configureTests } from '../../../../../../libs/df-testing'
import { Store } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Observable, of } from 'rxjs'
import { skip, take } from 'rxjs/operators'
import { provideMockActions } from '@ngrx/effects/testing'
import { OverviewEffects } from './overview.effects'
import { cold, hot } from 'jasmine-marbles'
import { CommitmentsSearchGQL, BookType } from '../../generated/graphql'
import {
  GetRefinedCommitments,
  LoadRefinedCommitments
} from '../../reducers/overview/overview.actions'

import {
  ApolloTestingModule,
  ApolloTestingController
} from 'apollo-angular/testing'

describe('OverviewEffects', () => {
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let overviewEffects: OverviewEffects
  let backend: ApolloTestingController

  const initialState = {
    app: {
      config: {
        webId: 'C9013762-2FED-49D7-8EA2-1DD650C7010E',
        siteId: '52233101-86F9-46D7-BBC0-22139AF854EE',
        header: { bookType: BookType.Red }
      },
      notification: { message: '', code: '', data: null },
      spinner: false,
      appError: null
    },
    refiner: {
      refinerGroups: [
        {
          children: [
            {
              expanded: false,
              group: 'commitmentTypes',
              id: 1,
              selected: false,
              title: 'National'
            }
          ],
          expanded: false,
          group: 'commitmentTypes',
          id: undefined,
          selected: true,
          title: 'National'
        }
      ],
      expandedRefinerGroups: [],
      selectedRefiners: [{ group: 'commitmentTypes', id: 1 }],
      textRefiner: null
    }
  }

  beforeEach(async(() => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [ApolloTestingModule],
        providers: [
          OverviewEffects,
          provideMockActions(() => actions$),
          provideMockStore({ initialState })
        ]
      })
    }
    configureTests(configure).then(testBed => {
      mockStore = testBed.get(Store)
      overviewEffects = testBed.get(OverviewEffects)
      backend = testBed.get(ApolloTestingController)
    })
  }))

  afterEach(() => {
    // backend.verify() //ensure there are no open operations
  })

  it('should be created', () => {
    expect(overviewEffects).toBeTruthy()
  })

  it('should set the initial state to a mocked one', () => {
    mockStore.setState(initialState)
    mockStore.pipe(take(1)).subscribe({
      next(val) {
        expect(val).toEqual(initialState)
      }
    })
  })

  it('should dispatch a StartAppInitialiser action in App-Init lifecycle', () => {
    const action = new GetRefinedCommitments(null)
    mockStore.scannedActions$
      .pipe(skip(1))
      .subscribe(scannedAction => expect(scannedAction).toEqual(action))
    mockStore.dispatch(action)
  })

  it('should start app init', inject(
    [CommitmentsSearchGQL],
    (getRefinedCommitmentsGQL: CommitmentsSearchGQL) => {
      let result = {
        data: {
          commitments: [
            {
              id: 10,
              title: 'ARIA Music Teacher Award',
              bookType: 'Red',
              politicalParty: 'Australian Labor Party',
              announcedBy: null,
              displayOrder: '1'
            }
          ],
          loading: false,
          networkStatus: 7,
          stale: false
        }
      }

      const action = new GetRefinedCommitments(null)
      actions$ = hot('-a', { a: action })
      const expected = cold('-b', { b: new LoadRefinedCommitments(result) })
      spyOn(getRefinedCommitmentsGQL, 'fetch').and.returnValue(of(result))

      expect(overviewEffects.getRefinedCommitments$).toBeObservable(expected)
    }
  ))
})
