import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 


import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { DisplayOrderPageComponent } from './display-order-page.component'

//import { ConfigureFn, configureTests } from '../../../lib/testing'
import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'

import { Store, createSelector, select} from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Observable, BehaviorSubject, Subscription } from 'rxjs'
import { skip, take } from 'rxjs/operators'
import { provideMockActions } from '@ngrx/effects/testing'

import { NO_ERRORS_SCHEMA } from '@angular/core'
import {DragDropModule} from '@angular/cdk/drag-drop'
import {
  GetCommitmentDisplayOrders,
  SetReOrderedCommitments,
  ApplyCommitmentDisplayOrders,
  SetDisplayOrderListChanged
} from '../../reducers/commitment-display-order/commitment-display-order.actions'
import { UserState } from '@digital-first/df-app-core'
import { getUserCurrentUserDisplayOrderPermission } from '../../reducers/user/user.reducer'
import * as fromOverview from '../../reducers/overview/overview.reducer'
import * as fromDisplayOrder from '../../reducers/commitment-display-order/commitment-display-order.reducer'
import { CommitmentRow } from '../../models/commitment.model'
import * as fromRefiner from '../../reducers/refiner/refiner.reducer'
import * as fromUser from '../../../../../../libs/df-app-core/src'

describe('DisplayOrderPageComponent', () => {
  let component: DisplayOrderPageComponent
  let fixture: ComponentFixture<DisplayOrderPageComponent>
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let commitmentsWithDisplayOrder$: BehaviorSubject<any[]> = new BehaviorSubject([])
  let commitmentsWithoutDisplayOrder$: BehaviorSubject<
  CommitmentRow[]
> = new BehaviorSubject([])
  let filterCommitmentsSubscription: Subscription
  let refinerGroupsSubscription$:  Observable<any>

  const initialState =   {
    commitments: getCommitments(),
    columns: [
      { prop: 'title', name: 'Title' },
      { prop: 'portfolio', name: 'Responsible Portfolio' },
      { prop: 'criticalDate', name: 'Critical Date' }
    ],
    error: {},
    commitmentDisplayOrders: [{commitmentId: 5, commitment: {portfolioLookup: {title: "Communications and the Arts"}, title: "Community Music Hubs kkkk"},displayOrder: 1},
                              {commitmentId: 7, commitment: {portfolioLookup: {title: "Communications and the Arts"},title: "New Recordings Program"},displayOrder: 2}],
    reOrderedCommitmentIds: [],
    displayOrderListChanged: false,
    errors: null,
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
  
const reducerState: fromRefiner.State = {
    refinerGroups: [],
    selectedRefiners: [],
    autoExpandGroup: [],
    textRefiner: null,
    hiddenRefinerGroup: ['electorates', 'states']
  }

  const selectRefinedCommitmentsState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.commitments
  )

  const getCommitmentDisplayOrdersState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.commitmentDisplayOrders
  )

  const   getUserCurrentUser = createSelector(
    () => initialState,
    (state: typeof initialState) => state.user
  )
  
  const   getUserCurrentUserPermissions = createSelector(
    () => initialState,
    (state: typeof initialState) => state.operations
  )
  
  const getUserCurrentOperationDefaults = createSelector(
    () => initialState,
    (state: typeof initialState) => state.operationDefaults
  )

  const getDisplayOrderListChangedState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.displayOrderListChanged
  )
  
  
  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOrderPageComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [DragDropModule],
      providers:
      [
          provideMockActions(() => actions$),
          provideMockStore({ initialState,
           selectors: [
           { selector: selectRefinedCommitmentsState, value: initialState.commitments },
          { selector: getCommitmentDisplayOrdersState , value: initialState.commitmentDisplayOrders },
          { selector: getUserCurrentUser, value: initialState.user },
          { selector: getUserCurrentUserPermissions , value: initialState.operations },
          {selector: getDisplayOrderListChangedState, value: initialState.displayOrderListChanged}
        ],
      }),
      ]
    })
   }
   configureTests(configure).then(testBed => {
    mockStore = TestBed.get(Store)
 //   mockStore.setState({commitment: getCommitment().commitmentDetail.commitment, loaded: false, handlingAdvices: [], errors: []})
    fixture = testBed.createComponent(DisplayOrderPageComponent)
    component = fixture.componentInstance;
  
    
     mockStore.overrideSelector(fromOverview.selectRefinedCommitmentsState, getCommitments())
    mockStore.overrideSelector(fromDisplayOrder.getCommitmentDisplayOrdersState, initialState.commitmentDisplayOrders) 
    mockStore.overrideSelector(fromDisplayOrder.getDisplayOrderListChangedState, initialState.displayOrderListChanged)    
    //mockStore.overrideSelector(fromUser.getUserCurrentUserOperations, initialState.operationDefaults)
    mockStore.overrideSelector(getUserCurrentUserPermissions, initialState.operations)
    mockStore.overrideSelector(getUserCurrentOperationDefaults, initialState.operationDefaults)

    let newReducerState = {...reducerState, refinerGroups: getRefiners()}
 mockStore.setState(newReducerState)
    mockStore.overrideSelector(fromRefiner.refinerGroupsState,newReducerState.refinerGroups)
    mockStore.overrideSelector(fromRefiner.selectedRefinersState,newReducerState.selectedRefiners)
    mockStore.overrideSelector(fromRefiner.autoExpandGroupState,newReducerState.autoExpandGroup)
    mockStore.overrideSelector(fromRefiner.selectTextRefinerState,newReducerState.textRefiner)
    mockStore.overrideSelector(fromRefiner.hiddenRefinerGroupsState,newReducerState.hiddenRefinerGroup)

    mockStore.overrideSelector(fromUser.getUserCurrentUser, initialState.user)    
    mockStore.overrideSelector(fromUser.getUserCurrentUserOperations, initialState.operationDefaults)


    fixture.detectChanges();
  
  })
  
  }))

   afterEach(() => {
    selectRefinedCommitmentsState.release();
    getCommitmentDisplayOrdersState.release();
    getUserCurrentOperationDefaults.release();
    getUserCurrentUser.release()
    getUserCurrentUserPermissions.release()
    getDisplayOrderListChangedState.release()
    mockStore.resetSelectors();  
  
  }) 
 
  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should dispatch false to set display order list changed action', () => {
    const action = new SetDisplayOrderListChanged(false)
    mockStore.scannedActions$
      .pipe(skip(1))
      .subscribe(scannedAction => expect(scannedAction).toEqual(action));
    mockStore.dispatch(action);
  }) 

  it('should Display Order List Changed State as false', () => {
     mockStore
      .select(getDisplayOrderListChangedState)
      .subscribe(result => {
        expect(result).toEqual(false)
       
    })
  })  

  it('should Display Order List Changed State as true', () => {

    mockStore.overrideSelector(getDisplayOrderListChangedState, true)
    mockStore
     .select(getDisplayOrderListChangedState)
     .subscribe(result => {
       expect(result).toEqual(true)
      
   })
 })  

 it('should provide a commitment without a display order', () => {
   filterCommitmentsSubscription = mockStore.select(fromOverview.selectFilteredCommitmentsState)
   .subscribe((data: any) => {
     commitmentsWithoutDisplayOrder$.next(
       data
         .filter(c => !c.displayOrder)
         .map(c => ({
           commitmentId: c.id,
           title: c.title,
           portfolio: c.portfolio
         }))
     )
   })

   commitmentsWithoutDisplayOrder$.subscribe((result: any[]) => {
     expect(result[0].commitmentId).toEqual(10)
   })
 })

 it('should provide commitments with display orders', () => {
  filterCommitmentsSubscription.add(
    mockStore
      .select(fromDisplayOrder.getCommitmentsWithDisplayOrderState)
      .subscribe(result => {
        commitmentsWithDisplayOrder$.next(result)
      })
  )

  commitmentsWithDisplayOrder$.subscribe(result => {
    expect(result[0].commitmentId).toEqual(5)
  })

 })

 it('should return refiner groups', () => {
  mockStore
   .select(fromRefiner.selectRefinerGroups)
   .subscribe(refiners => {
    expect(refiners.length).toBe(6)
       expect(refiners[0].title).toBe('Commitment Types')
       expect(refiners[0].children[0].title).toBe('National')
 })
}) 

it('should add refiner groups to the behaviour Subject', () => {
refinerGroupsSubscription$ = mockStore.pipe(
  select(fromRefiner.selectRefinerGroups))

  refinerGroupsSubscription$.subscribe(refiners => {
    expect(refiners.length).toBe(6)
  })
})

})

function getCommitments(){
  const data = [{id: 10, title: "ARIA Music Teacher Award",bookType: "Red", 
  politicalParty: "Australian Labor Party", announcedBy: null, displayOrder: undefined, portfolio: "Communications and the Arts"}]

  return data
}

function getRefiners(){
  const refiners =  [{children:[ 
    {
      cascadGroups: [],
      children: undefined,
      expanded: false,
      group: 'commitmentTypes',
      groupBy: '',
      id: 1,
      selected: false,
      singleSelection: true,
      title: 'National'},
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
}],
enableSlide: undefined,
expanded: false,
group: 'commitmentTypes',
id: undefined,
selected: false,
title: 'Commitment Types'
},
{
  children: [{
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
      title: 'Aston'}],
  enableSlide: true,
  expanded: false,
  group: 'electorates',
  id: undefined,
  selected: false,
  title: 'Electorates'
},
{
  children: [{
    cascadGroups: [],
    children: undefined,
    expanded: false,
    group: 'states',
    groupBy: '',
    id: 1,
    selected: false,
    singleSelection: undefined,
     title: 'SA'}, 
  {
    cascadGroups: [],
    children: undefined,
    expanded: false,
    group: 'states',
    groupBy: '',
    id: 2,
    selected: false,
    singleSelection: undefined, 
    title: 'VIC'}],
  enableSlide: undefined,
  expanded: false,
  group: 'states',
  id: undefined,
  selected: false,
  title: 'States'
},
{children:[
  {
    cascadGroups: [],
    children: undefined,
    expanded: false,
    group: 'criticalDates',
    groupBy: '',
    id: 1,
    selected: false,
    singleSelection: undefined, 
    title: 'Budget'},
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
  }],
    enableSlide: undefined,
    expanded: false,
    group: 'criticalDates',
    id: undefined,
    selected: false,
    title: 'Critical Date'},
    {children:[
      {
        cascadGroups: [],
        children: undefined,
        expanded: false,
        group: 'portfolioLookups',
        groupBy: '',
        id: 1,
        selected: false,
        singleSelection: undefined, 
        title: 'Agriculture and Water Resources'},
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
      }],
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

