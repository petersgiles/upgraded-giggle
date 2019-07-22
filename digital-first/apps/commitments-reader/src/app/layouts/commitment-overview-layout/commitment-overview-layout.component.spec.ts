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

import {Location} from '@angular/common'
import { NO_ERRORS_SCHEMA } from '@angular/core'

import * as fromRefiner from '../../reducers/refiner/refiner.reducer'


import * as fromApp  from '../../../../../../libs/df-app-core/src'

describe('CommitmentOverviewLayoutComponent', () => {

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
   }
   configureTests(configure).then(testBed => {
    fixture = testBed.createComponent(CommitmentOverviewLayoutComponent)
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store)
    router = TestBed.get(Router)
    
    mockStore.overrideSelector(fromRefiner.selectRefinerGroupsState, getRefinerGroups().refiner.refinerGroups)
    mockStore.overrideSelector(fromRefiner.selectExpandedRefinerGroupsState, [])
    mockStore.overrideSelector(fromRefiner.selectSelectedRefinersState, [{group: "commitmentTypes", id: 1}]) 
    mockStore.overrideSelector(fromRefiner.selectTextRefinerState, null)    
    mockStore.overrideSelector(fromApp.selectAppSpinnerState , false)
    fixture.detectChanges();

    router.initialNavigation()
   
  })
  
  }))

   afterEach(() => {
    selectExpandedRefinerGroupsState.release();
    selectSelectedRefinersState.release();
    selectTextRefinerState.release();
    selectAppSpinnerState.release()
    mockStore.resetSelectors(); 
  
  }); 
 
  it('should create', () => {
    expect(component).toBeTruthy()
  })

    it('should allow mocking of selector selectRefinerGroups when its selectors are set', () => {
     let expectedValue = getRefinerGroups().refiner
     mockStore
      .select(fromRefiner.selectRefinerGroups)
      .subscribe(result => {
        expect(result[0].children).toEqual(expectedValue.refinerGroups[0].children)
    })
  })   
 
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
        selected: true,
        title: "National"}],
        expandedRefinerGroups: [],
        selectedRefiners: [{group: "commitmentTypes", id: 1}],
        textRefiner: null
      }
    }

    return data
  }

})
