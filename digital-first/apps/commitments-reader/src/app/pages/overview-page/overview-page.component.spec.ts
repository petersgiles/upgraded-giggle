import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy'
import 'zone.js/dist/async-test'
import 'zone.js/dist/proxy.js'
import 'zone.js/dist/sync-test'
import 'jest-zone-patch'

import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { OverviewPageComponent } from './overview-page.component'
import { Store, createSelector, select } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Observable } from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { Router } from '@angular/router'
import * as fromOverview from '../../reducers/overview/overview.reducer'
import * as fromRefiner from '../../reducers/refiner/refiner.reducer'

describe('OverviewPageComponent', () => {
  let component: OverviewPageComponent
  let fixture: ComponentFixture<OverviewPageComponent>
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let router: Router
  let refinerGroupsSubscription$: Observable<any>

  const initialState: fromOverview.State = {
    commitments: [],
    columns: [
      { prop: 'title', name: 'Title' },
      { prop: 'portfolio', name: 'Responsible Portfolio' },
      { prop: 'criticalDate', name: 'Critical Date' }
    ],
    error: {}
  }
  const reducerState: fromRefiner.State = {
    refinerGroups: [],
    expandedRefinerGroups: [],
    selectedRefiners: [],
    autoExpandGroup: [],
    textRefiner: null,
    hiddenRefinerGroup: ['electorates', 'states'],
    refinerOpen: true
  }

  beforeEach(async(() => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [OverviewPageComponent],
        providers: [
          {
            provide: Store,
            useValue: {
              pipe: jest.fn()
            }
          },
          {
            provide: Router,
            useValue: { navigate: jest.fn() }
          },
          provideMockActions(() => actions$),
          provideMockStore({ initialState })
        ]
      })
    }
    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(OverviewPageComponent)
      component = fixture.componentInstance
      mockStore = testBed.get(Store)
      router = testBed.get(Router)
      let state = { ...initialState, commitments: getCommitments() }
      mockStore.overrideSelector(
        fromOverview.selectRefinedCommitmentsColumnsState,
        initialState.columns
      )
      mockStore.overrideSelector(
        fromOverview.selectFilteredCommitmentsState,
        state.commitments
      )

      let newReducerState = { ...reducerState, refinerGroups: getRefiners() }
      mockStore.setState(newReducerState)
      mockStore.overrideSelector(
        fromRefiner.refinerGroupsState,
        newReducerState.refinerGroups
      )
      mockStore.overrideSelector(
        fromRefiner.selectedRefinersState,
        newReducerState.selectedRefiners
      )
      mockStore.overrideSelector(
        fromRefiner.autoExpandGroupState,
        newReducerState.autoExpandGroup
      )
      mockStore.overrideSelector(
        fromRefiner.selectTextRefinerState,
        newReducerState.textRefiner
      )
      mockStore.overrideSelector(
        fromRefiner.hiddenRefinerGroupsState,
        newReducerState.hiddenRefinerGroup
      )
      mockStore.overrideSelector(
        fromRefiner.selectExpandedRefinerGroupsState,
        newReducerState.expandedRefinerGroups
      )
      fixture.detectChanges()
    })
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should return columns', () => {
    mockStore
      .select(fromOverview.selectRefinedCommitmentsColumnsState)
      .subscribe(columns => {
        expect(columns[0].prop).toBe('title')
      })
  })

  it('should return columns', () => {
    mockStore
      .select(fromOverview.selectFilteredCommitmentsState)
      .subscribe(commitments => {
        expect(commitments[0].title).toBe('ARIA Music Teacher Award')
      })
  })

  it('should return refiner groups', () => {
    mockStore.select(fromRefiner.selectRefinerGroups).subscribe(refiners => {
      expect(refiners.length).toBe(6)
      expect(refiners[0].title).toBe('Commitment Types')
      expect(refiners[0].children[0].title).toBe('National')
    })
  })

  it('should add refiner groups to the behaviour Subject', () => {
    refinerGroupsSubscription$ = mockStore.pipe(
      select(fromRefiner.selectRefinerGroups)
    )

    refinerGroupsSubscription$.subscribe(refiners => {
      expect(refiners.length).toBe(6)
    })
  })
})

function getCommitments() {
  const data = [
    {
      id: 10,
      title: 'ARIA Music Teacher Award',
      bookType: 'Red',
      politicalParty: 'Australian Labor Party',
      announcedBy: null,
      displayOrder: undefined,
      portfolio: 'Communications and the Arts',
      commitmentType: 'International',
      criticalDate: undefined
    }
  ]

  return data
}

function getRefiners() {
  const refiners = [
    {
      children: [
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'commitmentTypes',
          groupBy: '',
          id: 1,
          selected: false,
          singleSelection: true,
          title: 'National'
        },
        {
          cascadGroups: ['states'],
          children: undefined,
          expanded: false,
          group: 'commitmentTypes',
          groupBy: '',
          id: 2,
          selected: false,
          singleSelection: true,
          title: 'State'
        },
        {
          cascadGroups: ['electorates'],
          children: undefined,
          expanded: false,
          group: 'commitmentTypes',
          groupBy: '',
          id: 3,
          selected: false,
          singleSelection: true,
          title: 'Electorate'
        },
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'commitmentTypes',
          groupBy: '',
          id: 4,
          selected: false,
          singleSelection: true,
          title: 'International'
        }
      ],
      enableSlide: undefined,
      expanded: false,
      group: 'commitmentTypes',
      id: undefined,
      selected: false,
      title: 'Commitment Types'
    },
    {
      children: [
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'electorates',
          groupBy: undefined,
          id: 1,
          selected: false,
          singleSelection: undefined,
          title: 'Adelaide'
        },
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'electorates',
          groupBy: undefined,
          id: 2,
          selected: false,
          singleSelection: undefined,
          title: 'Aston'
        }
      ],
      enableSlide: true,
      expanded: false,
      group: 'electorates',
      id: undefined,
      selected: false,
      title: 'Electorates'
    },
    {
      children: [
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'states',
          groupBy: '',
          id: 1,
          selected: false,
          singleSelection: undefined,
          title: 'SA'
        },
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'states',
          groupBy: '',
          id: 2,
          selected: false,
          singleSelection: undefined,
          title: 'VIC'
        }
      ],
      enableSlide: undefined,
      expanded: false,
      group: 'states',
      id: undefined,
      selected: false,
      title: 'States'
    },
    {
      children: [
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'criticalDates',
          groupBy: '',
          id: 1,
          selected: false,
          singleSelection: undefined,
          title: 'Budget'
        },
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'criticalDates',
          groupBy: '',
          id: 2,
          selected: false,
          singleSelection: undefined,
          title: 'First 100 days'
        }
      ],
      enableSlide: undefined,
      expanded: false,
      group: 'criticalDates',
      id: undefined,
      selected: false,
      title: 'Critical Date'
    },
    {
      children: [
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'portfolioLookups',
          groupBy: '',
          id: 1,
          selected: false,
          singleSelection: undefined,
          title: 'Agriculture and Water Resources'
        },
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'portfolioLookups',
          groupBy: '',
          id: 2,
          selected: false,
          singleSelection: undefined,
          title: "Attorney-General's"
        }
      ],
      enableSlide: undefined,
      expanded: false,
      group: 'portfolioLookups',
      id: undefined,
      selected: false,
      title: 'Portfolios'
    },
    {
      children: [],
      enableSlide: undefined,
      expanded: false,
      group: 'deckItemBriefSummaries',
      id: undefined,
      selected: false,
      title: 'Theme'
    }
  ]
  return refiners
}
