import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 


import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { DisplayOrderPageComponent } from './display-order-page.component'

import { ConfigureFn, configureTests } from '../../../lib/testing'

import { Store, createSelector} from '@ngrx/store'
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
})

function getCommitments(){
  const data = [{id: 10, title: "ARIA Music Teacher Award",bookType: "Red", 
  politicalParty: "Australian Labor Party", announcedBy: null, displayOrder: undefined, portfolio: "Communications and the Arts"}]

  return data
}