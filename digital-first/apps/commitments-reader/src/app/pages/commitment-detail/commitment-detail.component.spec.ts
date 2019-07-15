import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 


import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AppRouterService } from '../../services/app-router.service'
import { CommitmentDetailComponent } from './commitment-detail.component'

import { ConfigureFn, configureTests } from '../../../lib/testing'

import { Store, createSelector } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Router, ActivatedRoute } from '@angular/router'
import { Observable, of } from 'rxjs'
import { skip, take } from 'rxjs/operators'
import { provideMockActions } from '@ngrx/effects/testing'

import {Location} from '@angular/common'
import { NO_ERRORS_SCHEMA } from '@angular/core'

import { DfMomentModule, DateFormatPipe } from '../../../../../../libs/df-moment/src'
import { SafeHtmlPipe } from '../../../../../../libs/df-pipes/src/lib/safe-html.pipe'
import { DfPipesModule } from '../../../../../../libs/df-pipes/src/lib/df-pipes.module'
import * as fromDetail from '../../reducers/commitment-detail/commitment-detail.reducer'
import * as fromUser from '../../../../../../libs/df-app-core/src'
import { getUserCurrentUserPermissions,getUserCurrentOperationDefaults } from '../../../../../../libs/df-app-core/src/lib/reducers/user/user.reducer'
import { Commitment } from '../../models/commitment.model'

import { CommitmentLocation } from '../../models/commitment.model'
import {
  GetDetailedCommitment,
  UpdatePMOHandlingAdvice,
  UpdatePMCHandlingAdvice
} from '../../reducers/commitment-detail/commitment-detail.actions'
import { getCurrentUserOperations } from 'apps/commitments/src/app/reducers'
import { OPERATION_PMO_HANDLING_ADVICE, OPERATION_PMC_HANDLING_ADVICE } from '../../services/app-data/app-operations';
import {
  getUserOperationMatrix
} from '../../../../../../libs/df-app-core/src'

describe('CommitmentDetailComponent', () => {
 
  let component: CommitmentDetailComponent
  let fixture: ComponentFixture<CommitmentDetailComponent>
  let mockStore: MockStore<fromDetail.State>
  let actions$: Observable<any>
  let router: Router
  
  const initialState =   {
    commitment: getCommitment().commitmentDetail.commitment,
    loaded: false,
    handlingAdvices: [],
    errors: [{message: '', code: '', data: null}],
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

  const getCommitmentState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.commitment
  )

  const getErrorState = createSelector(
    () => initialState,
    (state: typeof initialState)  => state.errors
  )
  
  const getHandlingAdvicesState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.handlingAdvices
  )
 
  
  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      declarations: [ CommitmentDetailComponent ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'login', component:CommitmentDetailComponent },
      ]),  DfMomentModule, DfPipesModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers:
      [
        Location,
        AppRouterService,
        DateFormatPipe,
        SafeHtmlPipe,
       { provide: ActivatedRoute, useValue: { params: of({ id: '0' })}},
          provideMockActions(() => actions$),
          provideMockStore({ initialState,
           selectors: [
          { selector: getUserCurrentUser, value: initialState.user },
          { selector: getUserCurrentUserPermissions , value: initialState.operations },
          { selector: getUserCurrentOperationDefaults , value: initialState.operationDefaults },
          { selector: getCommitmentState , value: getCommitment().commitmentDetail.commitment },
          { selector: getErrorState , value: initialState.errors },
          { selector: getHandlingAdvicesState , value: initialState.handlingAdvices }//
        ],
      }),
      ]
    })
   }
   configureTests(configure).then(testBed => {
    mockStore = TestBed.get(Store)
    mockStore.setState({commitment: getCommitment().commitmentDetail.commitment, loaded: false, handlingAdvices: [], errors: []})
    fixture = testBed.createComponent(CommitmentDetailComponent)
    component = fixture.componentInstance;
    
    router = TestBed.get(Router)
    
    mockStore.overrideSelector(fromDetail.getCommitmentState, getCommitment().commitmentDetail.commitment)
    mockStore.overrideSelector(fromDetail.getErrorState, initialState.errors) 
    mockStore.overrideSelector(fromDetail.getHandlingAdvicesState, initialState.handlingAdvices)
    mockStore.overrideSelector(fromUser.getUserCurrentUser, initialState.user)    
    mockStore.overrideSelector(fromUser.getUserCurrentUserOperations, initialState.operationDefaults)
    mockStore.overrideSelector(getUserCurrentUserPermissions, initialState.operations)
    mockStore.overrideSelector(getUserCurrentOperationDefaults, initialState.operationDefaults)
    //mockStore.overrideSelector(fromDetail.getDetailedCommitmentState, {commitment: getCommitment().commitmentDetail.commitment, errors: null})//
    fixture.detectChanges();

    router.initialNavigation()
  
  })
  
  }))

   afterEach(() => {
    getUserCurrentUser.release();
    getUserCurrentUserPermissions.release();
    getUserCurrentOperationDefaults.release();
    getErrorState.release()
    getCommitmentState.release()
    mockStore.resetSelectors(); 
  
  }) 
 
  it('should create', () => {
    expect(component).toBeTruthy()
  })

     it('should return four items from operations matrix', () => {
     mockStore
      .select(getUserOperationMatrix)
      .subscribe(result => {
        expect(result[0]).toEqual({hide: true, read: false, title: 'displayorder', write: false})
       expect(result[1]).toEqual({hide: true, read: false, title: 'planner', write: false})
       expect(result[2]).toEqual({hide: false, read: false, title: 'pmchandlingadvice', write: true})
       expect(result[3]).toEqual({hide: false, read: false, title: 'pmohandlingadvice', write: true})
    })
  })  
  
  it('should return commitment and handlers', () => {
    mockStore
     .select(fromDetail.getDetailedCommitmentState)
     .subscribe(result => {
       let commitment = result.commitment
       expect(commitment.id).toEqual(20)
       expect(commitment.bookType).toEqual('Red')
       expect(commitment.pmcHandlingAdvice.value).toEqual('f946e9cb-6e73-433d-998d-549d9ac8b5df')
   })
 })  
 
 it('should dispatch a StartAppInitialiser action in App-Init lifecycle', () => {
  const action = new GetDetailedCommitment({ id: '0'})
  mockStore.scannedActions$
    .pipe(skip(1))
    .subscribe(scannedAction => expect(scannedAction).toEqual(action));
  mockStore.dispatch(action);
})

it('should set the initial state to a mocked one', () => {
  
 // mockStore.setState(initialState);
  mockStore.pipe(take(1)).subscribe({
    next(val) {
      expect(val).toEqual(initialState);
    },
   
  });
})
 
  function getCommitment(){
    const data = {commitmentDetail:{
                  commitment: {
                    announcedBy: null,
                    announcementType: 'Speech',
                    bookType: 'Red',
                    commitmentType: 'International',
                    cost: null,
                    criticalDate: 'Undefined',
                    date: '2018-10-29T00:00:00+11:00',
                    description: 'Labor has committed to establish a new Australian government-backed infrastructure investment bank offering concessional loans and financing for vital, nation-building infrastructure in the Pacific Islands region.&nbsp;',
                    electorates: [],
                    id: 20,
                    title: '', 
                    status: '', 
                    politicalParty: 'ALP',
                    pmcHandlingAdvice:{label: 'Budget Process',value: 'f946e9cb-6e73-433d-998d-549d9ac8b5df'},
                    pmoHandlingAdvice: {label: 'Minister to implement', value: 'ee5ba805-8eb4-4031-9528-c40f48e76c55'}
                  }
      }
    }
    return data
  }

  function getUserMatrix(){
    const data = {
      userMatrix: [{hide: false, read: false, title: 'pmohandlingadvice', write: true},
                 {hide: false, read: false, title: 'pmohandlingadvice', write: true}]
    }
    return data
  }

})
