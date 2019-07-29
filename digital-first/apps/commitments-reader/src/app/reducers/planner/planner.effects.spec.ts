import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 

import { Injector} from '@angular/core'
import { async, TestBed, inject} from '@angular/core/testing'
import { ConfigureFn, configureTests } from '../../../lib/testing'
import { Store } from '@ngrx/store'
import { provideMockStore, MockStore, MockState } from '@ngrx/store/testing'
import { Observable, of } from 'rxjs'
import { skip, take } from 'rxjs/operators'
import { provideMockActions } from '@ngrx/effects/testing'

import { cold, hot } from 'jasmine-marbles'

import {
  GetExternalEvents,
  GetEventReferenceData,
  StoreCommitmentEvent,
  PlannerActionTypes,
  PlannerActions,
  GetCommitmentEvents,
  LoadExternalEvents,
  LoadCommitmentEvents,
  LoadEventTypes,
  LoadExternalEventTypes,
  LoadSelectedExternalEventTypes,
  GetEventTypes,
  GetExternalEventTypes,
  RemoveCommitmentEvent,
  ErrorInPlanner
} from './planner.actions'

import { EventDevelopDataService } from '../../services/commitment-event/develop/commitment-event-develop-data.service'
import { CommitmentEventDataService } from '../../services/commitment-event/commitment-event-data-service'
import * as fromPlanner from '../../reducers/planner/planner.reducer'
import { PlannerEffects } from './planner.effects'

import * as app from 'bryntum-scheduler/scheduler.umd.js'


jest.mock('bryntum-scheduler/scheduler.umd.js') 


describe('PlannerEffects', () => {
  debugger
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let plannerEffects: PlannerEffects
 
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

const dataServiceFactory = () => {
    let injector = Injector.create([{
      provide: EventDevelopDataService,
      deps: []
    }])
    
    return injector.get(EventDevelopDataService)
  }

  
  beforeEach(async(() => { 
    const configure: ConfigureFn = testBed => {
        TestBed.configureTestingModule({
     providers:
          [ 
            {
                provide: CommitmentEventDataService,
                useFactory: dataServiceFactory,
                deps: []
              },
              { provide: EventDevelopDataService,
                useValue: {
                  getEventsByCommitments: jest.fn(),
                  getExternalEvents: jest.fn(),
                 // storeEvent: jest.fn(),
                  removeEvent: jest.fn()
                }
               },
              PlannerEffects,
              provideMockActions(() => actions$),
              provideMockStore({ initialState}),
          ],
        })
      }
       configureTests(configure).then(testBed => {
        mockStore = TestBed.get(Store)
        plannerEffects = TestBed.get(PlannerEffects)
      
      })
  }))


  it('should be created', () => {
    expect(PlannerEffects).toBeTruthy();
  })

  it('should Commitments',  inject([CommitmentEventDataService], (commitmentEventDataService: CommitmentEventDataService) => {
    mockStore.setState({planner:{schedulerPageIndex: 3,permission: 'write'}, overview: getCommitments()})
    let result = {data: getCommitments()}

    const action = new GetCommitmentEvents(null)
    actions$ = hot('-a', { a: action} );
    const response = cold('-a|', { a: result })
    const expected = cold('--b', {b: new LoadCommitmentEvents(result)})
    commitmentEventDataService.getEventsByCommitments = jest.fn(() => response)
    
    expect(plannerEffects.getCommitmentsEvents$ ).toBeObservable(expected)
  }))

  it('should load event types', ()  => {
    let result = 'write'
    
    const action = new GetEventReferenceData(result)
    actions$ = hot('-a', { a: action} );
    const expected = cold('-(bc)', {b: new GetEventTypes(result), c: new GetExternalEventTypes(result)})
    
    expect(plannerEffects.getEventsReferenceData$ ).toBeObservable(expected)
  })

   it('should get event types',  inject([CommitmentEventDataService], (commitmentEventDataService: CommitmentEventDataService) => {
    let result = {data: getEventTypes()}

    const action = new GetEventTypes(null)
    actions$ = hot('-a', { a: action} );
    const response = cold('-a|', { a: result })
    const expected = cold('--b', {b: new LoadEventTypes(result)})
    commitmentEventDataService.getEventTypes = jest.fn(() => response)
    
    expect(plannerEffects.getEventTypes$).toBeObservable(expected)
  }))


  it('should get external events where there is external event', () => {
   
   let dt = new Date('2019/10/10')
    app.DateHelper.parse = jest.fn(() => dt)
    mockStore.setState({planner:{selectedExternalEventTypes: getExternalEvents()}})
    let result = {data: [{cls: "timerange-sitting-both",
    endDate: new Date('2019-10-09T13:00:00.000Z'),
    eventTypeId: undefined,
    name: "Both Houses of Parliament Sitting",
    startDate: new Date('2019-10-09T13:00:00.000Z')}]} 


    const action = new GetExternalEvents({permission: 'write', selectedExternalEventTypes: getExternalEvents()})
    actions$ = hot('-a', { a: action} );
    const expected = cold('-b', {b: new LoadExternalEvents(result)})
    
  
    expect(plannerEffects.getExternalEvents$ ).toBeObservable(expected)
  })

  it('should return empty array where no external event in store', () => {
     mockStore.setState({planner:{selectedExternalEventTypes: []}})
     let result = {data: [], error: null, loading: false} 
 
 
     const action = new GetExternalEvents({permission: 'write', selectedExternalEventTypes:[]})
     actions$ = hot('-a', { a: action} );
     const expected = cold('-b', {b: new LoadExternalEvents(result)})
     
   
     expect(plannerEffects.getExternalEvents$ ).toBeObservable(expected)
   })

   it('should store event',  inject([CommitmentEventDataService], (commitmentEventDataService: CommitmentEventDataService) => {
    const data = {cls: "",draggable: true,duration: 0,durationUnit: "d",endDate: 'Mon Feb 11 2019 00:00:00 GMT+1100 (Australian Eastern Daylight Time)',
    eventColor: "CadetBlue",
    eventType: "0002",
    iconCls: "b-fa b-fa-fw b-fa-users",
    id: "_generatedEventModel1",
    name: "Cabinet Meeting",
    resizable: true,
    resourceId: 11,
    startDate: 'Mon Feb 11 2019 00:00:00 GMT+1100 (Australian Eastern Daylight Time)',
    permission: "write"}
    
    mockStore.setState({data: data ,planner:{permission: 'write'}})
    let result = {data: data}

    const action = new StoreCommitmentEvent(data)
    actions$ = hot('-a', { a: action} );
    const response = cold('-a|', { a: result })
    const expected = cold('--b', {b: new GetCommitmentEvents(null)})
    commitmentEventDataService.storeEvent = jest.fn(() => response)
    
    expect(plannerEffects.storeCommitmentEvent$).toBeObservable(expected)
  }))

  it('should return real error when permission is read',  () => {
    const data = {cls: "",draggable: true,duration: 0,durationUnit: "d",endDate: 'Mon Feb 11 2019 00:00:00 GMT+1100 (Australian Eastern Daylight Time)',
    eventColor: "CadetBlue",
    eventType: "0002",
    iconCls: "b-fa b-fa-fw b-fa-users",
    id: "_generatedEventModel1",
    name: "Cabinet Meeting",
    resizable: true,
    resourceId: 11,
    startDate: 'Mon Feb 11 2019 00:00:00 GMT+1100 (Australian Eastern Daylight Time)',
    permission: "read"}
    
    mockStore.setState({data: data ,planner:{permission: 'read'}})
    let result = {data: data}

    const action = new StoreCommitmentEvent(data)
    actions$ = hot('-a', { a: action} );
    const expected = cold('-(bc)', {b: new ErrorInPlanner('You do not have permission to edit event'), c: new GetCommitmentEvents(null)})
    
    expect(plannerEffects.storeCommitmentEvent$).toBeObservable(expected)
  })

  it('should remove event',  inject([CommitmentEventDataService], (commitmentEventDataService: CommitmentEventDataService) => {
    mockStore.setState({planner:{permission: 'write'}})

    const data = {cls: "",draggable: true,duration: 30,durationUnit: "d",endDate: 'Tue Mar 26 2019 00:00:00 GMT+1100 (Australian Eastern Daylight Time)',
    eventColor: "ForestGreen",
    eventType: "0001",
    iconCls: "b-fa b-fa-fw b-fa-podcast",
    id: "0.48699627916138777",
    name: "Policy development",
    resizable: true,
    resourceId: 396,
    startDate: 'Sun Feb 24 2019 00:00:00 GMT+1100 (Australian Eastern Daylight Time)',
    permission: "write"}

    const action = new RemoveCommitmentEvent(data)
    actions$ = hot('-a', { a: action} );
    const response = cold('-a|', { a: data })
    const expected = cold('--b', {b: new GetCommitmentEvents(null)})
    commitmentEventDataService.removeEvent = jest.fn(() => response)
  
    expect(plannerEffects.removeCommitmentEvent$ ).toBeObservable(expected)
  }))

  it('should return real error on remove event when permission is read', () => {
    mockStore.setState({planner:{permission: 'read'}})

    const data = {cls: "",draggable: true,duration: 30,durationUnit: "d",endDate: 'Tue Mar 26 2019 00:00:00 GMT+1100 (Australian Eastern Daylight Time)',
    eventColor: "ForestGreen",
    eventType: "0001",
    iconCls: "b-fa b-fa-fw b-fa-podcast",
    id: "0.48699627916138777",
    name: "Policy development",
    resizable: true,
    resourceId: 396,
    startDate: 'Sun Feb 24 2019 00:00:00 GMT+1100 (Australian Eastern Daylight Time)',
    permission: "read"}

    const action = new RemoveCommitmentEvent(data)
    actions$ = hot('-a', { a: action} );
    const expected = cold('-(bc)', {b: new ErrorInPlanner('You do not have permission to edit event'), c: new GetCommitmentEvents(null)})
  
  
    expect(plannerEffects.removeCommitmentEvent$ ).toBeObservable(expected)
  })

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
  const data = [
    {
      "id": "0001",
      "type": "Policy development",
      "duration": 30,
      "durationUnit": "d",
      "icon": "b-fa b-fa-fw b-fa-podcast",
      "color": "ForestGreen"
    },
    {
      "id": "0002",
      "type": "Cabinet Meeting",
      "duration": 0,
      "durationUnit": "d",
      "icon": "b-fa b-fa-fw b-fa-users",
      "color": "CadetBlue"
    },
    {
      "id": "0003",
      "type": "Drafting the Explanatory Memorandum",
      "duration": 7,
      "durationUnit": "d",
      "icon": "b-fa b-fa-fw b-fa-file",
      "color": "Sienna"
    },
    {
      "id": "0004",
      "type": "Drafting legislative",
      "duration": 30,
      "durationUnit": "d",
      "icon": "b-fa b-fa-fw b-fa-book",
      "color": "DarkSlateGrey"
    },
    {
      "id": "0005",
      "type": "Legislative introduction",
      "duration": 0,
      "durationUnit": "d",
      "icon": "b-fa b-fa-fw b-fa-language",
      "color": "Black"
    },
    {
      "id": "0006",
      "type": "Announcement",
      "duration": 0,
      "durationUnit": "d",
      "icon": "b-fa b-fa-fw b-fa-bullhorn",
      "color": "DarkRed"
    },
    {
      "id": "0007",
      "type": "Review",
      "duration": 90,
      "durationUnit": "d",
      "icon": "b-fa b-fa-fw b-fa-eye",
      "color": "FireBrick"
    }
  ]
  
  return data
}


