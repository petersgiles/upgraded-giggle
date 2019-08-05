import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AppRouterService } from '../../services/app-router.service'
import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'
import { Store, createSelector } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import {
  getUserOperationMatrix
} from '../../../../../../libs/df-app-core/src'
import { SafeHtmlPipe } from '../../../../../../libs/df-pipes/src/lib/safe-html.pipe'
import { DfPipesModule } from '../../../../../../libs/df-pipes/src/lib/df-pipes.module'
import { Observable, of } from 'rxjs'
import { skip, take } from 'rxjs/operators'
import { provideMockActions } from '@ngrx/effects/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import * as fromUser from '../../../../../../libs/df-app-core/src'
import { UserProfileComponent } from './user-profile.component'

describe('UserProfileComponent', () => {
  let component: UserProfileComponent
  let fixture: ComponentFixture<UserProfileComponent>
  let mockStore: MockStore<any>
  let actions$: Observable<any>
 
 const initialState =   {
    //commitment: getCommitment().commitmentDetail.commitment,
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
  
  
  beforeEach(async(() => {
      const configure: ConfigureFn = testBed => {
      TestBed.configureTestingModule({
        declarations: [ UserProfileComponent ],
        imports: [DfPipesModule],
        schemas: [NO_ERRORS_SCHEMA],
        providers:
        [
            SafeHtmlPipe,
            provideMockActions(() => actions$),
            provideMockStore({ initialState,
             selectors: [
            { selector: getUserCurrentUser, value: initialState.user },
            { selector: getUserCurrentUserPermissions , value: initialState.operations },
            { selector: getUserCurrentOperationDefaults , value: initialState.operationDefaults },
            
          ],
        }),
        ]
      })
     }
     configureTests(configure).then(testBed => {
      mockStore = TestBed.get(Store)
      fixture = testBed.createComponent(UserProfileComponent)
      component = fixture.componentInstance;
      
      mockStore.overrideSelector(fromUser.getUserCurrentUser, initialState.user)    
      mockStore.overrideSelector(fromUser.getUserCurrentUserOperations, initialState.operationDefaults)
      mockStore.overrideSelector(getUserCurrentUserPermissions, initialState.operations)
      mockStore.overrideSelector(getUserCurrentOperationDefaults, initialState.operationDefaults)
      fixture.detectChanges();  
    })
    
    }))
  
   
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
    
   /*  it('should return commitment and handlers', () => {
      mockStore
       .select(fromDetail.getDetailedCommitmentState)
       .subscribe(result => {
         let commitment = result.commitment
         expect(commitment.id).toEqual(20)
         expect(commitment.bookType).toEqual('Red')
         expect(commitment.pmcHandlingAdvice.value).toEqual('f946e9cb-6e73-433d-998d-549d9ac8b5df')
     }) */
   })  
   
  
    function getUserMatrix(){
      const data = {
        userMatrix: [{hide: false, read: false, title: 'pmohandlingadvice', write: true},
                   {hide: false, read: false, title: 'pmohandlingadvice', write: true}]
      }
      return data
    }
  
