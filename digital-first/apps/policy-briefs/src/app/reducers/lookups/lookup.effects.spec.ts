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
  GetLookupSubPolicies
} from './lookup.actions'

import { LookupDataService } from './lookup-data.service'
import { LookupDataLocalService } from '../../reducers/lookups/local/lookup-data.service'
import { policies, subpolicies, briefs } from '../../../../../../devdata/data'

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
   let subpolicies$: BehaviorSubject<LookupValue[]> = new BehaviorSubject(subpolicyMap)

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
    let result = getPolicies()
    const action = new GetLookupPolicies()
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: result });
    const expected = cold('--b', {b: new LoadLookupPolicies({data: result ,loading: false})})
    service.getPolicies = jest.fn(() => response)

    expect(lookupEffects.getPolicies$).toBeObservable(expected)
  }))

  it('should get sub-policies', inject([LookupDataService], (service:LookupDataService)  => {
  //  getPolicies = (config?: any): Observable<any> => this.policies$
    

    let result = getSubPolicies()
    const action = new GetLookupSubPolicies()
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: result });
    const expected = cold('--b', {b: new LoadLookupSubPolicies({data: result ,loading: false})})
    service.getPolicies = jest.fn(() => response)

    expect(lookupEffects.getSubPolicies$).toBeObservable(expected)
  }))


})

const subpolicyMap = subpolicies.map(p => ({
  caption: p.Title,
  value: `${p.Id}`
}))

function getPolicies(){
  const policies = [
    {
      Id: 2,
      Title: 'Sample Policy Two',
      SortOrder: 99,
      ID: 2,
      Colour: 'Green'
    },
    {
      Id: 1,
      Title: 'Sample Policy',
      SortOrder: 999,
      ID: 1,
      Colour: 'Crimson'
    }
  ]
  return policies
}

function getSubPolicies(){
  const subpolicies = [
    {
      Id: 4,
      Title: 'SubPolicy Four',
      SortOrder: 9,
      ID: 4,
      Colour: 'Silver',
      Policy: {
        Id: 2,
        Title: 'Sample Policy Two',
        Colour: 'Green',
        SortOrder: 99
      }
    },
    {
      Policy: {
        Id: 1,
        Title: 'Sample Policy',
        Colour: 'Crimson',
        SortOrder: 999
      },
      Id: 3,
      Title: 'SubPolicy Three',
      SortOrder: 50,
      Colour: 'Green',
      ID: 3
    },
    {
      Policy: {
        Id: 1,
        Title: 'Sample Policy',
        Colour: 'Crimson',
        SortOrder: 999
      },
      Id: 1,
      Title: 'SubPolicy One',
      SortOrder: 999,
      Colour: 'Crimson',
      ID: 1
    } 
  ]
 return subpolicies  
}

function getStatuses(){
  const briefstatuses = [
    {
      Id: 1,
      Title: 'In Draft',
      ID: 1,
      SortOrder: 1,
      Enumeration: 0,
      Icon: 'people',
      Colour: 'Pink'
    },
    {
      Id: 2,
      Title: 'Ready',
      ID: 2,
      SortOrder: 2,
      Enumeration: 2,
      Icon: 'playlist_add_check',
      Colour: 'GhostWhite'
    },
    {
      Id: 3,
      Title: 'Cancelled',
      ID: 3,
      SortOrder: 3,
      Enumeration: 4,
      Icon: 'cancel_presentation',
      Colour: 'Crimson'
    }
  ]
  return briefstatuses
}

function getActivities(){
  const activityList = [
    { id: '1', icon: 'people', colour: 'Pink', order: 1, caption: `Decision` },
    {
      id: '2',
      icon: 'people',
      colour: 'Pink',
      order: 2,
      caption: `New Comments`
    },
    {
      id: '3',
      icon: 'people',
      colour: 'Pink',
      order: 3,
      caption: `New Documents`
    },
    {
      id: '4',
      icon: 'people',
      colour: 'Pink',
      order: 4,
      caption: `Updates and Changes`
    }
  ]
 return activityList  
}


