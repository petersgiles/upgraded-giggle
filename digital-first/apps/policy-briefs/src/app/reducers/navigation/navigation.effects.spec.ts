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
import { of, Observable } from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { cold, hot } from 'jasmine-marbles'

import {
  NavigationActionTypes,
  NavigationActions,
  GetNavigations,
  LoadNavigations,
  GetNavigationsFailure
} from './navigation.actions'
import { policies, subpolicies, briefs } from '../../../../../../devdata/data'
import { NavigatorTreeNode } from '@df/components'
import { NavigationDataService } from './navigation-data.service'
import { NavigationDataLocalService } from '../../reducers/navigation/local/navigation-data.service'
import { NavigationEffects } from './navigation.effects'
import { BriefNavigationMapperService } from '../../services/mappers/brief-navigation-mapper.service'
import { BriefMapperService } from '../../services/mappers/brief-mapper.service'
import { CoreMapperService } from '../../services/mappers/core-mapper.service'


describe('NavigationEffects', () => {
    let mockStore: MockStore<any>
    let actions$: Observable<any>
    let navigationEffects: NavigationEffects
   let service: NavigationDataLocalService

    beforeEach(async(() => { 
      const configure = (testBed: TestBed) => {
          testBed.configureTestingModule({
            imports: [],
       providers:
            [ 
              BriefMapperService,
              {provide: CoreMapperService,
              useClass: BriefMapperService
              },
              {provide: NavigationDataService,
              useClass: NavigationDataLocalService
            },
            { provide: Store,
              useValue: {
                pipe: jest.fn()
              }
             },
                NavigationEffects,
                provideMockActions(() => actions$),
              //  provideMockStore({ initialState}),
            ],
          })
        }
         configureTests(configure).then(testBed => {
          mockStore = testBed.get(Store)
          navigationEffects = testBed.get(NavigationEffects)
          service = testBed.get(NavigationDataLocalService)
        })
    }))
  
  
    

  it('should be created', () => {
    expect(navigationEffects).toBeTruthy()
  })

  function getNavigations(){
    let navigations: NavigatorTreeNode[]
    service.getNavigations().subscribe(items => 
      navigations = items.data.nodes)
    return navigations
  }

  it('should Load Navigation Nodes', inject([NavigationDataService], (service:NavigationDataService)  => {
    let navigations = getNavigations()
    const action = new GetNavigations()
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: {data: {nodes: navigations}, loading: false} });
    const expected = cold('--b', {b: new LoadNavigations({nodes: navigations,loading: false})})
    service.getNavigations = jest.fn(() => response)

    expect(navigationEffects.getNavigations$).toBeObservable(expected)
  }))

})

