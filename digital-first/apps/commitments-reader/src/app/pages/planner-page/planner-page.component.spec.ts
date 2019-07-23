import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import { ConfigureFn, configureTests } from '../../../lib/testing'

import { Store, createSelector, select } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Observable} from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { Router } from '@angular/router'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { PlannerPageComponent } from './planner-page.component'
import {
  GetEventReferenceData,
  StoreCommitmentEvent,
  RemoveCommitmentEvent,
  StoreSelectedExternalEventTypes,
  StoreSchedulerZoomLevel,
  GetCommitmentEvents,
  SetPlannerPermission,
  GetExternalEvents,
  StoreSchedulerCenterDate,
  StoreSchedulerPageIndex,
  ResetCommitmentEvents
} from '../../reducers/planner/planner.actions'
import { getUserCurrentUserPlannerPermission } from '../../reducers/user/user.reducer'
import * as fromPlanner from '../../reducers/planner/planner.reducer'
import * as fromOverview from '../../reducers/overview/overview.reducer'


describe('PlannerPageComponent', () => {
  let component: PlannerPageComponent;
  let fixture: ComponentFixture<PlannerPageComponent>;
  let mockStore: MockStore<any>
  let actions$: Observable<any>
 
  
  const initialState: fromPlanner.State = {
   
      commitments: [],
      events: [],
      eventTypes: [],
      externalEvents: [],
      externalEventTypes: [],
      selectedExternalEventTypes: [],
      schedulerZoomLevel: 3,
      schedulerCenterDate: new Date(),
      schedulerPageIndex: 0,
      readonly: true,
      permission: 'hide'
    
  }

  const userState ={
    user: {isSiteAdmin: true,
      login: 'guest',
      name: 'Guest User',
      roles: ['ROLE_OWNERS'],
      systemUserKey: 'guest',
      userid: 0
    },
operationDefaults: {displayorder: 'hide',planner: 'hide',pmchandlingadvice: 'write',pmohandlingadvice: 'write'},
 operations: {ROLE_MEMBERS: [{pmchandlingadvice: 'read', pmohandlingadvice: 'read'}],
             ROLE_OWNERS:  [{pmchandlingadvice: 'write', pmohandlingadvice: 'write'}],
             ROLE_VISITORS: [{pmchandlingadvice: 'hide', pmohandlingadvice: 'hide'}]}
  }

  const selectRefinedCommitmentsState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.commitments
  )

  const selectExternalEventTypesState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.externalEventTypes
  )

  const selectSelectedExternalEventTypesState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.selectedExternalEventTypes
  )

  const selectExternalEventsState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.externalEvents
  )

  const selectSchedulerCenterDateState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.schedulerCenterDate
  )
  const selectSchedulerPageIndexState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.schedulerPageIndex
  )
 

  const   getUserCurrentUser = createSelector(
    () => userState,
    (state: typeof userState) => userState.user
  )
  
  const   getUserCurrentUserPermissions = createSelector(
    () => userState,
    (state: typeof userState) => userState.operations
  )

  const selectPlannerPermissionState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.readonly
  )
 
  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      declarations: [ PlannerPageComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers:
      [
        { provide: Store,
           useValue: {
             pipe: jest.fn()
           }
          },
        
          provideMockActions(() => actions$),
          provideMockStore({ initialState,
           selectors: [
          { selector: selectRefinedCommitmentsState, value: initialState.commitments },
          {selector: selectExternalEventTypesState, value: initialState.externalEventTypes},
          {selector:  getUserCurrentUser, value: userState.user},
          {selector:  getUserCurrentUserPermissions, value: userState.operations},
          {selector: selectSelectedExternalEventTypesState, value: initialState.selectedExternalEventTypes},
          {selector: selectPlannerPermissionState, value: initialState.readonly},
          {selector: selectExternalEventsState, value: initialState.externalEvents},
          {selector: selectSchedulerCenterDateState, value: initialState.schedulerCenterDate},
          {selector: selectSchedulerPageIndexState, value: initialState.schedulerPageIndex}
        ],
      }),
      ]
    })
   }
   configureTests(configure).then(testBed => {
    mockStore = TestBed.get(Store)
   
    //mockStore.setState(state)
    fixture = TestBed.createComponent(PlannerPageComponent);
    component = fixture.componentInstance
    mockStore.overrideSelector(fromOverview.selectRefinedCommitmentsState, getCommitments())
    mockStore.overrideSelector(fromPlanner.selectExternalEventTypesState, initialState.externalEventTypes)
    mockStore.overrideSelector(fromPlanner.selectSelectedExternalEventTypesState, initialState.selectedExternalEventTypes)
    mockStore.overrideSelector(fromPlanner.selectPlannerPermissionState,initialState.readonly)
    mockStore.overrideSelector(fromPlanner.selectExternalEventsState, initialState.externalEvents)
    mockStore.overrideSelector(fromPlanner.selectSchedulerCenterDateState, initialState.schedulerCenterDate)
    mockStore.overrideSelector(fromPlanner.selectSchedulerPageIndexState, initialState.schedulerPageIndex)
    mockStore.overrideSelector(getUserCurrentUserPlannerPermission, userState.user)    
   
    fixture.detectChanges();
  })
  
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  })

 /*  it('should return map points', () => {
    mockStore
     .select(fromMap.selectRefinedMapPointsState)
     .subscribe(mapPoints => {
       for(let mapPoint of mapPoints){
        expect(mapPoint.id).toBe(77)
       expect(mapPoint.title).toBe('Kalgoorlie - Boulder WA, Australia')
       expect(mapPoint.latitude).toBe(-30.749) 
       }
   })
 }) 
 
 it('should add map points to the behaviour Subject', () => {
   filteredMapPoints$ = mockStore.pipe(
    select(fromMap.selectRefinedMapPointsState))
    filteredMapPoints$.subscribe(result => {
      
      for(let mapPoint of result){
          expect(mapPoint.latitude).toBe(-30.749)
      }
    })
 }) */

 function getCommitments(){
  const data = [{id: 10, title: "ARIA Music Teacher Award",bookType: "Red", 
  politicalParty: "Australian Labor Party", announcedBy: null, displayOrder: undefined, portfolio: "Communications and the Arts"}]

  return data
}
})
