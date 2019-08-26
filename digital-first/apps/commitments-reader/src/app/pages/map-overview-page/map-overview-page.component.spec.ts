import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy'
import 'zone.js/dist/async-test'
import 'zone.js/dist/proxy.js'
import 'zone.js/dist/sync-test'
import 'jest-zone-patch'

import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'

import { Store, createSelector, select } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Observable, Subscription } from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { Router } from '@angular/router'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MapOverviewPageComponent } from './map-overview-page.component'
import * as fromMap from '../../reducers/map/map.reducer'
import { MdcElevationModule } from '@angular-mdc/web'

import { MapPoint } from '../../../../../../libs/df-map/src'
import * as fromRefiner from '../../reducers/refiner/refiner.reducer'

describe('MapOverviewPageComponent', () => {
  let component: MapOverviewPageComponent
  let fixture: ComponentFixture<MapOverviewPageComponent>
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let router: Router
  let filteredMapPoints$: Observable<MapPoint[]>
  let refinerGroupsSubscription$: Observable<any>

  const initialState: fromMap.State = {
    mapPoints: []
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

  const selectRefinedMapPointsState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.mapPoints
  )

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
      TestBed.configureTestingModule({
        declarations: [MapOverviewPageComponent],
        schemas: [NO_ERRORS_SCHEMA],
        imports: [MdcElevationModule],
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
          provideMockStore({
            initialState,
            selectors: [
              {
                selector: selectRefinedMapPointsState,
                value: initialState.mapPoints
              }
            ]
          })
        ]
      })
    }
    configureTests(configure).then(testBed => {
      mockStore = TestBed.get(Store)
      let state = { ...initialState, mapPoints: getMapPoints()[0] }
      mockStore.setState(state)
      fixture = TestBed.createComponent(MapOverviewPageComponent)
      component = fixture.componentInstance
      router = testBed.get(Router)
      mockStore.overrideSelector(fromMap.selectRefinedMapPointsState, [
        state.mapPoints
      ])
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

  it('should return map points', () => {
    mockStore
      .select(fromMap.selectRefinedMapPointsState)
      .subscribe(mapPoints => {
        for (let mapPoint of mapPoints) {
          expect(mapPoint.id).toBe(77)
          expect(mapPoint.title).toBe('Kalgoorlie - Boulder WA, Australia')
          expect(mapPoint.latitude).toBe(-30.749)
        }
      })
  })

  it('should add map points to the behaviour Subject', () => {
    filteredMapPoints$ = mockStore.pipe(
      select(fromMap.selectRefinedMapPointsState)
    )
    filteredMapPoints$.subscribe(result => {
      for (let mapPoint of result) {
        expect(mapPoint.latitude).toBe(-30.749)
      }
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

function getMapPoints() {
  const data = [
    {
      id: 77,
      placeId: 'ChIJYQsiGslnTSoRzuH8N97a5mY',
      title: 'Kalgoorlie - Boulder WA, Australia',
      latitude: -30.749,
      longitude: 121.466,
      commitmentMapPoints: [
        {
          commitment: {
            commitmentType: { id: 1, title: 'National' },
            criticalDate: { id: 1, title: 'Budget' },
            id: 144,
            portfolioLookup: { id: 9, title: 'Health' },
            portfolioLookupId: 9,
            title: '20 New Medicare Subsidised MRI Licences'
          }
        }
      ]
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
