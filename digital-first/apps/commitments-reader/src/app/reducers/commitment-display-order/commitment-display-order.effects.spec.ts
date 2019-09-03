import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import {  TestBed, inject} from '@angular/core/testing'
//import { ConfigureFn, configureTests } from '../../../lib/testing'
import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'
import { Store} from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { TestScheduler } from 'rxjs/testing'
import { Observable, of, timer} from 'rxjs'
import { skip, take } from 'rxjs/operators'
import { provideMockActions } from '@ngrx/effects/testing'
import { CommitmentDisplayOrderEffects } from './commitment-display-order.effects'

import {
  AppNotification} from '../../../../../../libs/df-app-core/src'
import { cold, hot, getTestScheduler, time } from 'jasmine-marbles'

import {
  CommitmentDisplayOrderActionTypes,
  SetReOrderedCommitments,
  CommitmentDisplayOrderActions,
  LoadCommitmentDisplayOrders,
  GetCommitmentDisplayOrders,
  SetDisplayOrderListChanged,
  ApplyCommitmentDisplayOrdersFailure,
  ApplyCommitmentDisplayOrders
} from './commitment-display-order.actions'
import {
  GetSiteCommitmentDisplayOrdersGQL,
  ApplyCommitmentDisplayOrderGQL,
  BookType
} from '../../generated/graphql'
import { generateGUID } from '../../utils'

import { GetRefinedCommitments } from '../overview/overview.actions'

import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing'

describe('RefinerEffects', () => {
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let commitmentDisplayOrderEffects: CommitmentDisplayOrderEffects
  let backend: ApolloTestingController

  const initialState =   {
    app:{config: {webId: 'C9013762-2FED-49D7-8EA2-1DD650C7010E', siteId: '52233101-86F9-46D7-BBC0-22139AF854EE', header: {bookType: BookType.Red}}},
    commitmentDisplayOrder: {reOrderedCommitmentIds: [10]},
    displayOrderListChanged: false
    //errors: NotificationMessage[]
  } 

  beforeEach(() => { 
    const configure = (testBed: TestBed) => {
        testBed.configureTestingModule({
     imports: [ApolloTestingModule],
     providers:
          [ 
            CommitmentDisplayOrderEffects,
              provideMockActions(() => actions$),
              provideMockStore({ initialState}),
          ],
        })
      }
       configureTests(configure).then(testBed => {
        mockStore = testBed.get(Store)
        commitmentDisplayOrderEffects = testBed.get(CommitmentDisplayOrderEffects)
        backend = testBed.get(ApolloTestingController)

      })
  })

  afterEach(() => {
   // backend.verify() //ensure there are no open operations
  })

  it('should be created', () => {
    expect(commitmentDisplayOrderEffects).toBeTruthy();
  })

  it('should set the initial state to a mocked one', () => {
  
    mockStore.setState(initialState);
    mockStore.pipe(take(1)).subscribe({
      next(val) {
        expect(val).toEqual(initialState);
      },
     
    });
  })

   it('should dispatch a LoadCommitmentDisplayOrders action', (done) => {
    let siteCommitmentDisplayOrders = {"data":{"siteCommitmentDisplayOrders":
    [{"commitmentId":10,"displayOrder":"1","commitment":{"title":"ARIA Music Teacher Award","portfolioLookup":{"title":"Communications and the Arts"}}}]}}
    
    let action =  new LoadCommitmentDisplayOrders(siteCommitmentDisplayOrders)
    mockStore.scannedActions$
      .pipe(skip(1))
      .subscribe(scannedAction => expect(scannedAction).toEqual(action));
    mockStore.dispatch(action)
    done()
  }) 

  it('should get display orders', inject([GetSiteCommitmentDisplayOrdersGQL],(getSiteDisplayOrderGraphQL: GetSiteCommitmentDisplayOrdersGQL)  => { 
    let siteCommitmentDisplayOrders = {"data":{"siteCommitmentDisplayOrders":
    [{"commitmentId":10,"displayOrder":"1","commitment":{"title":"ARIA Music Teacher Award","portfolioLookup":{"title":"Communications and the Arts"}}}]}}
    
    let displayOrders =  new LoadCommitmentDisplayOrders(siteCommitmentDisplayOrders)
    let commitmentIds =  new SetReOrderedCommitments([10])
    const action = new GetCommitmentDisplayOrders(null)
    actions$ = hot('-a', { a: action} )
   
    const response = cold('-b|', {b: siteCommitmentDisplayOrders})
   
    spyOn(getSiteDisplayOrderGraphQL, 'fetch').and.returnValue(response)
    
    const expected = cold('--(cd)', { c: displayOrders, d: commitmentIds})
 
     expect(commitmentDisplayOrderEffects.getCommitmentDisplayOrder$ ).toBeObservable(expected)
  }))

  it('should update display orders', inject([ApplyCommitmentDisplayOrderGQL],(applyCommitmentDisplayOrder: ApplyCommitmentDisplayOrderGQL)  => { 

    let ordListChanged =  new SetDisplayOrderListChanged(false)
        let getDispOrders = new GetCommitmentDisplayOrders(null)
        let refinedCommitments = new GetRefinedCommitments(null)
        let msg = new AppNotification({
          message: 'Commitment Display Order Updated'
        }) 
    const action = new ApplyCommitmentDisplayOrders(null)
    const scheduler = getTestScheduler()

    scheduler.run(() => {
      actions$ = hot('-a', { a: action} )
      const expected = cold('2499ms --(bcde)', {b: ordListChanged, c: getDispOrders, d: refinedCommitments, e: msg})
      spyOn(applyCommitmentDisplayOrder, 'mutate').and.returnValue(of({"data":{"applyCommitmentDisplayOrder":{"id":"30bfc792-d20f-4e91-b05d-b0028d412726","__typename":"MutationResultGraph"}}}))
      expect(commitmentDisplayOrderEffects.applyCommitmentDisplayOrder$ ).toBeObservable(expected)
    })
    scheduler.flush()
  }))  
})