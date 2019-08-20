import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import { async, TestBed, inject} from '@angular/core/testing'
import { Injector} from '@angular/core'
import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'
import { Store } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import {
  concatMap,
  map,
  catchError,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { cold, hot } from 'jasmine-marbles'

import {
  LookupActionTypes,
  LookupActions,
  LoadLookupPolicies,
  LoadLookupSubPolicies,
  LoadLookupCommitments,
  LoadLookupClassifications,
  LoadLookupDLMs,
  LoadLookupStatuses,
  LoadLookupActivities,
  LoadLookupDivisions,
  GetLookupPolicies,
  GetLookupSubPolicies,
  GetLookupCommitments,
  GetLookupDLMs,
  GetLookupClassifications,
  GetLookupStatuses,
  GetLookupActivities,
  GetLookupDivisions
} from './lookup.actions'

import { LookupDataService } from './lookup-data.service'
import { LookupDataLocalService } from '../../reducers/lookups/local/lookup-data.service'
import { policies, subpolicies, commitments, classifications, dlms, briefstatuses, activityList } from '../../../../../../devdata/data'

import { DocumentStatus } from '@df/components'


import { LookupEffects } from './lookup.effects'

interface LookupValue {
  caption: string
  value: string
}

describe('LookupEffects', () => {
  debugger
    let mockStore: MockStore<any>
    let actions$: Observable<any>
    let lookupEffects: LookupEffects
   let service: LookupDataLocalService 
  // let subpolicies$: BehaviorSubject<LookupValue[]> = new BehaviorSubject(subpolicyMap)
  // let getSubpolicies_ = (config?: any): Observable<any> => this.subpolicies$

    beforeEach(async(() => { 
      const configure: ConfigureFn = testBed => {
          TestBed.configureTestingModule({
            imports: [],
       providers:
            [ 
              {provide: LookupDataService ,
              useClass: LookupDataLocalService 
            },
            { provide: Store,
              useValue: {
                pipe: jest.fn()
              }
             },
                LookupEffects,
                provideMockActions(() => actions$),
            ],
          })
        }
         configureTests(configure).then(testBed => {
          mockStore = TestBed.get(Store)
          lookupEffects = TestBed.get(LookupEffects)
          service = TestBed.get(LookupDataLocalService )
        })
    }))
  
  
    

  it('should be created', () => {
    expect(lookupEffects).toBeTruthy()
  })


  it('should get policies', inject([LookupDataService], (service:LookupDataService)  => {
    let result
    let sub = new BehaviorSubject(policyMap)
    let obs = (): Observable<any> => sub
    obs().subscribe(val => {
       result = val
    })
    const action = new GetLookupPolicies()
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: result });
    const expected = cold('--b', {b: new LoadLookupPolicies({data: result ,loading: false})})
    service.getPolicies = jest.fn(() => response)

    expect(lookupEffects.getPolicies$).toBeObservable(expected)
  }))

  it('should get sub-policies', inject([LookupDataService], (service:LookupDataService)  => {
  let result
    let sub = new BehaviorSubject(subpolicyMap)
    let obs = (): Observable<any> => sub
    obs().subscribe(val => {
       result = val
    })

  
    const action = new GetLookupSubPolicies()
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: result });
    const expected = cold('-b', {b: new LoadLookupSubPolicies({data: result ,loading: false})})
    service.getPolicies = jest.fn(() => response)

    expect(lookupEffects.getSubPolicies$).toBeObservable(expected)
  }))

  it('should get commitments', inject([LookupDataService], (service:LookupDataService)  => {
    let result
      let sub = new BehaviorSubject(commitmentMap)
      let obs = (): Observable<any> => sub
      obs().subscribe(val => {
         result = val
      })
  
      const action = new GetLookupCommitments()
      actions$ = hot('-a', { a: action} )
      const response = cold('-a|', { a: result });
      const expected = cold('-b', {b: new LoadLookupCommitments({data: result ,loading: false})})
      service.getPolicies = jest.fn(() => response)
  
      expect(lookupEffects.getCommitments$).toBeObservable(expected)
    }))
  
    it('should get protective markings', inject([LookupDataService], (service:LookupDataService)  => {
      let result
        let sub = new BehaviorSubject(dlms)
        let obs = (): Observable<any> => sub
        obs().subscribe(val => {
           result = val
        })
    
        const action = new GetLookupDLMs()
        actions$ = hot('-a', { a: action} )
        const response = cold('-a|', { a: result });
        const expected = cold('--b', {b: new LoadLookupDLMs({data: result ,loading: false})})
        service.getDLMs = jest.fn(() => response)
    
        expect(lookupEffects.getDLMs$).toBeObservable(expected)
      }))
    
      it('should get classifications', inject([LookupDataService], (service:LookupDataService)  => {
        let result
          let sub = new BehaviorSubject(classifications)
          let obs = (): Observable<any> => sub
          obs().subscribe(val => {
             result = val
          })
      
          const action = new GetLookupClassifications()
          actions$ = hot('-a', { a: action} )
          const response = cold('-a|', { a: result });
          const expected = cold('--b', {b: new LoadLookupClassifications({data: result ,loading: false})})
          service.getClassifications = jest.fn(() => response)
      
          expect(lookupEffects.getClassifications$).toBeObservable(expected)
        }))

        it('should get statuses', inject([LookupDataService], (service:LookupDataService)  => {
          let result
            let sub = new BehaviorSubject(statusMap)
            let obs = (): Observable<any> => sub
            obs().subscribe(val => {
               result = val
            })
        
            const action = new GetLookupStatuses()
            actions$ = hot('-a', { a: action} )
            const response = cold('-a|', { a: result });
            const expected = cold('-b', {b: new LoadLookupStatuses({data: result ,loading: false})})
            service.getClassifications = jest.fn(() => response)
        
            expect(lookupEffects.getLookupStatuses$).toBeObservable(expected)
          }))

          it('should get activities', inject([LookupDataService], (service:LookupDataService)  => {
            let result
              let sub = new BehaviorSubject(activityList)
              let obs = (): Observable<any> => sub
              obs().subscribe(val => {
                 result = val
              })
          
              const action = new GetLookupActivities()
              actions$ = hot('-a', { a: action} )
              const response = cold('-a|', { a: result });
              const expected = cold('-b', {b: new LoadLookupActivities({data: result ,loading: false})})
              service.getClassifications = jest.fn(() => response)
          
              expect(lookupEffects.getLookupActivities$).toBeObservable(expected)
            }))

            it('should get divisions', inject([LookupDataService], (service:LookupDataService)  => {
              let result
                let sub = new BehaviorSubject(dlms)
                let obs = (): Observable<any> => sub
                obs().subscribe(val => {
                   result = val
                })
            
                const action = new GetLookupDivisions()
                actions$ = hot('-a', { a: action} )
                const response = cold('-a|', { a: result });
                const expected = cold('--b', {b: new LoadLookupDivisions({data: result ,loading: false})})
                service.getLookupDivisions = jest.fn(() => response)
            
                expect(lookupEffects.getLookupDivisions$).toBeObservable(expected)
              }))
})

const policyMap = policies.map(p => ({ caption: p.Title, value: `${p.Id}` }))

const subpolicyMap = subpolicies.map(p => ({
  caption: p.Title,
  value: `${p.Id}`,
  policy: p.Policy.Id
}))

const commitmentMap = commitments.map(p => ({
  caption: p.Title,
  value: `${p.ID}`
}))


const statusMap: DocumentStatus[] = briefstatuses.map(p => ({
  id: `${p.ID}`,
  icon: p.Icon,
  caption: p.Title,
  colour: p.Colour,
  order: p.SortOrder
}))

