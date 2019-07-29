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
import { Observable, Subscription} from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { PlannerPageComponent } from './planner-page.component'
import { getUserCurrentUserPlannerPermission } from '../../reducers/user/user.reducer'
import * as fromPlanner from '../../reducers/planner/planner.reducer'
import * as fromOverview from '../../reducers/overview/overview.reducer'
import * as fromUser from '../../../../../../libs/df-app-core/src'
import { UserState } from '../../../../../../libs/df-app-core/src'

describe('PlannerPageComponent', () => {
  let component: PlannerPageComponent;
  let fixture: ComponentFixture<PlannerPageComponent>;
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let filteredCommitments$: Observable<any[]>

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
         
      }),
      ]
    })
   }
   configureTests(configure).then(testBed => {
    mockStore = TestBed.get(Store)
    let state = {...initialState, events:getEvents(), externalEvents:getExternalEvents(), externalEventTypes: getExternalEventTypes(), eventTypes: getEventTypes()}
    mockStore.setState(state)
    fixture = TestBed.createComponent(PlannerPageComponent);
    component = fixture.componentInstance
    
    mockStore.overrideSelector(fromOverview.selectRefinedCommitmentsState, getCommitments())
    mockStore.overrideSelector(fromPlanner.selectEventsState, state.events)
    mockStore.overrideSelector(fromPlanner.selectExternalEventTypesState, state.externalEventTypes)
    mockStore.overrideSelector(fromPlanner.selectSelectedExternalEventTypesState, initialState.selectedExternalEventTypes)
    mockStore.overrideSelector(fromPlanner.selectPlannerPermissionState,initialState.readonly)
    mockStore.overrideSelector(fromPlanner.selectExternalEventsState, state.externalEvents)
    mockStore.overrideSelector(fromPlanner.selectSchedulerCenterDateState, initialState.schedulerCenterDate)
    mockStore.overrideSelector(fromPlanner.selectSchedulerPageIndexState, initialState.schedulerPageIndex)
    mockStore.overrideSelector(fromPlanner.selectEventTypesState, state.eventTypes)
    mockStore.overrideSelector(fromPlanner.selectSchedulerZoomLevelState, initialState.schedulerZoomLevel) 
    mockStore.overrideSelector(fromUser.getUserCurrentUserOperations, userState.operationDefaults)
    mockStore.overrideSelector(fromUser.getUserCurrentUser, userState.user)
    fixture.detectChanges();
  })
  
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  })

   it('should return commitments from selector', () => {
    mockStore
     .select(fromOverview.selectRefinedCommitmentsState)
     .subscribe(data => {
         data.map(c => {
           expect(c.id).toBe(10)
           expect(c.title).toBe('ARIA Music Teacher Award')
         })
    }
   )
 }) 
 
 it('observable shiuld return commitments', () => {
  filteredCommitments$ = mockStore.pipe(
    select(fromOverview.selectRefinedCommitmentsState))
    filteredCommitments$.subscribe(result => {
          expect(result[0].id).toBe(10)
      }
    )
 }) 

 it('should return events from selector', () => {
  mockStore
   .select(fromPlanner.selectEventsState)
   .subscribe(events => {
     for(let event of events){
       expect(event.id).toBe('0.14079460290227752')
     }
       })
  }
 )

 it('should return external events from selector', () => {
  mockStore
   .select(fromPlanner.selectExternalEventsState)
   .subscribe(externalEvents => {
     for(let event of externalEvents){
       if(event.id === '0001'){
          expect(event.name).toBe('Announcements')}
       else if(event.id === '0002'){
            expect(event.name).toBe('House of Repsentatives')}
     }
       })
  }
 )

  it('should return external event types from selector', () => {
  mockStore
   .select(fromPlanner.selectExternalEventTypesState)
   .subscribe(externalEventTypes => {
        expect(externalEventTypes[0].title).toBe('House of Representatives')
     }
  )
}) 

it('should return event types from selector', () => {
  mockStore
   .select(fromPlanner.selectEventTypesState)
   .subscribe(eventTypes => {
     for(let eventType of eventTypes){
       if(eventType.id === '0001'){
          expect(eventType.type).toBe('Policy development')}
       else if(eventType === '0002'){
            expect(eventType.type).toBe('Cabinet Meeting')}
     }
       })
  }
 )

 it('should return scheduler zoom level from selector', () => {
  mockStore
   .select(fromPlanner.selectSchedulerZoomLevelState)
   .subscribe(zoomLevel => {
      expect(zoomLevel).toBe(3)
     }
  )
  }
 )
 
 it('should return write op when user is site admin', () => {
  mockStore.overrideSelector(fromUser.getUserCurrentUser, userState.user)  
  mockStore
   .select(getUserCurrentUserPlannerPermission)
   .subscribe(operation => {
      expect(operation).toBe('write')
     }
  )
  }
 )
}) 

describe('TestUser', () => {
  let component: PlannerPageComponent;
  let fixture: ComponentFixture<PlannerPageComponent>;
  let mockStore: MockStore<UserState>

 const initialState ={
    user: {isSiteAdmin: false,
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
        
          provideMockStore({ initialState}),
      ]
    })
   }
   configureTests(configure).then(testBed => {
    mockStore = TestBed.get(Store)
  
    fixture = TestBed.createComponent(PlannerPageComponent);
    component = fixture.componentInstance
    mockStore.overrideSelector(fromOverview.selectRefinedCommitmentsState, getCommitments())
    mockStore.overrideSelector(fromPlanner.selectEventsState, [])
    mockStore.overrideSelector(fromPlanner.selectExternalEventTypesState, [])
    mockStore.overrideSelector(fromPlanner.selectSelectedExternalEventTypesState, [])
    mockStore.overrideSelector(fromPlanner.selectExternalEventsState, [])
    mockStore.overrideSelector(fromPlanner.selectEventTypesState, [])
    mockStore.overrideSelector(fromPlanner.selectPlannerPermissionState,false)
    mockStore.overrideSelector(fromUser.getUserCurrentUserOperations, initialState.operationDefaults)
    mockStore.overrideSelector(fromUser.getUserCurrentUser, initialState.user)
    fixture.detectChanges();
  })
  
  }))
it('should return hide op when user is not site admin', () => {
  
  mockStore
   .select(getUserCurrentUserPlannerPermission)
   .subscribe(operation => {
      expect(operation).toBe('hide')
     }
  )
  }
 )
}) 

 function getCommitments(){
  const data = [{id: 10, title: "ARIA Music Teacher Award",bookType: "Red", 
  politicalParty: "Australian Labor Party", announcedBy: null, displayOrder: undefined, portfolio: "Communications and the Arts"}]

  return data
}

function getEvents(){
  const data = [{startDate: "2019-02-11T13:00:00.000Z", endDate: "2019-03-13T13:00:00.000Z", durationUnit: "d", cls: "", draggable: true, resizable: true,
id: "0.14079460290227752", duration: 30, name: "Policy development", resourceId: 10, eventType: "0001", eventColor: "ForestGreen", iconCls: "b-fa b-fa-fw b-fa-podcast"}]
  return data
}

function getExternalEvents(){
  const data =  [{id: "0001", name: "Announcements", cssClass: "timerange-announcements",},
  {id: "0002", name: "House of Repsentatives", cssClass: "timerange-sitting-house"}]
  return data
}

function getExternalEventTypes(){
  const data = [
    {title:	'House of Representatives', CssClass:	'timerange-sitting-house'},
    {title:	'Senate', CssClass:	'timerange-sitting-senate'},
    {title:	'Both Houses', CssClass:	'timerange-sitting-both'},
    {title:	'Overseas travel', CssClass:	'timerange-sitting-travel'},
  ]
  return data
}

function getEventTypes(){
  const data = [{id: "0001", type: "Policy development", duration: 30, durationUnit: "d", icon: "b-fa b-fa-fw b-fa-podcast", color: "ForestGreen"},
  {id: "0002", type: "Cabinet Meeting", duration: 0, durationUnit: "d", icon: "b-fa b-fa-fw b-fa-users", color: "CadetBlue"}]
  return data
}



