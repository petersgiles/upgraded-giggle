import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import "zone.js/dist/proxy";
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 


import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AppRouterService } from '../../services/app-router.service'
import { CommitmentOverviewLayoutComponent } from './commitment-overview-layout.component'

import { ConfigureFn, configureTests } from '../../../lib/testing'

import { Store, createSelector } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Router, ActivatedRoute } from '@angular/router'
import { Observable, of } from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { Actions } from '@ngrx/effects'
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { take, skip } from 'rxjs/operators'

import * as fromRefiner from '../../reducers/refiner/refiner.reducer'
import { GetRefinedCommitments } from '../../reducers/overview/overview.actions'
import { GetRefinedMapPoints } from '../../reducers/map/map.actions'

import * as fromApp  from '../../../../../../libs/df-app-core/src'

describe('CommitmentLayoutComponent', () => {
  debugger
  let component: CommitmentOverviewLayoutComponent
  let fixture: ComponentFixture<CommitmentOverviewLayoutComponent>
  let mockStore: MockStore<fromRefiner.State>
  let actions$: Observable<any>
  let router: Router
  
  const initialState =   {
    router: {
      state: {
        url: Location,
        params: {},
        queryParams: {}
      },
      navigate: 0
    },
    config: {webId: "", siteId: "", header: {bookType: 'red'}},
    refiner: {
    refinerGroups: [{children:[]}],
    expandedRefinerGroups: [],
    selectedRefiners: [],
    textRefiner: null},
    spinner: false
  } 

  const selectRefinerGroupsState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.refiner.refinerGroups
  )

  const selectExpandedRefinerGroupsState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.refiner.expandedRefinerGroups
  )
  const selectRefinerGroups = createSelector(
    () => initialState.refiner,
    (state: typeof initialState.refiner, add: {getRefinerGroups()}) => state
  )

  const selectSelectedRefinersState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.refiner.selectedRefiners
  )
  
  const selectTextRefinerState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.refiner.textRefiner
  )

  const selectAppSpinnerState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.spinner
  )

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      declarations: [ CommitmentOverviewLayoutComponent ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'login', component:CommitmentOverviewLayoutComponent },
      ])],
      schemas: [NO_ERRORS_SCHEMA],
      providers:
      [
        Location,
        AppRouterService,
       { provide: ActivatedRoute, useValue: { queryParams: of({ refiner: null })}},
          provideMockActions(() => actions$),
          provideMockStore({ initialState,
           selectors: [
          { selector: selectRefinerGroupsState, value: getRefinerGroups().refiner.refinerGroups },
          { selector: selectExpandedRefinerGroupsState , value: getRefinerGroups().refiner.expandedRefinerGroups },
          { selector: selectSelectedRefinersState , value: getRefinerGroups().refiner.selectedRefiners },
          { selector: selectTextRefinerState , value: getRefinerGroups().refiner.textRefiner },
          { selector: selectAppSpinnerState , value: false },
        ],
      }),
      ]
    })
   }// .compileComponents()
   configureTests(configure).then(testBed => {
    fixture = testBed.createComponent(CommitmentOverviewLayoutComponent)
    component = fixture.componentInstance;
   // store = TestBed.get(Store)
    mockStore = TestBed.get(Store)
    router = TestBed.get(Router)
    
    mockStore.overrideSelector(fromRefiner.selectRefinerGroupsState, getRefinerGroups().refiner.refinerGroups)
    mockStore.overrideSelector(fromRefiner.selectExpandedRefinerGroupsState, [])
    mockStore.overrideSelector(fromRefiner.selectSelectedRefinersState, [])
    mockStore.overrideSelector(fromRefiner.selectTextRefinerState, null)
    mockStore.overrideSelector(fromApp.selectAppSpinnerState , false)
    fixture.detectChanges();

    router.initialNavigation()
  })
  
  }))

 
  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the initial state to a mocked one', () => {
    mockStore.setState(initialState.refiner);
    mockStore.pipe(take(1)).subscribe({
      next(val) {
        expect(val.refinerGroups).toEqual([]);
      },
     // error: done.fail,
     // complete: done,donefn
    })
  })

  it('should allow tracing dispatched Get Refined Commitments action', () => {
    const action = new GetRefinedCommitments(null)
    mockStore.scannedActions$
      .pipe(skip(1))
      .subscribe(scannedAction => expect(scannedAction).toEqual(action));
    mockStore.dispatch(action)
    updateState(mockStore)
   
  })

 /*  it('should set the new state', () => {
    updateState(mockStore)
    mockStore.pipe(take(1)).subscribe(state => {
      expect(state.refinerGroups).toBe(getRefinerGroups().refiner.refinerGroups);
    })
  }) */

  it('should allow mocking of store.select with string selector using provideMockStore', () => {
    const expectedValue = getRefinerGroups().refiner
    mockStore.overrideSelector(fromRefiner.selectRefinerGroupsState, getRefinerGroups().refiner.refinerGroups)
     mockStore
      .select(selectRefinerGroups)
      .subscribe(result => {
        let x = result
        console.log(x)
      //expect(result).toStrictEqual(expectedValue)
    })
  });

  function getRefinerGroups(){
    const data = {refiner:{
      refinerGroups: [
        {children:[ {expanded: false,
          group: "commitmentTypes",
          id: 1,
          selected: false,
          title: "National"}],
        expanded: false,
        group: "commitmentTypes",
        id: undefined,
        selected: false,
        title: "National"}],
        expandedRefinerGroups: [],
        selectedRefiners: [],
        textRefiner: null
      }
    }

    return data
  }

  function updateState(mockStore: MockStore<fromRefiner.State>){
    mockStore.setState({refinerGroups: getRefinerGroups().refiner.refinerGroups, expandedRefinerGroups: [], selectedRefiners: [], textRefiner: null});
  }
})
