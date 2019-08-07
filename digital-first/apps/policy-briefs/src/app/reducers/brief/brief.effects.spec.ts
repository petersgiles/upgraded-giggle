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
import { Observable, of } from 'rxjs'
import { skip, take } from 'rxjs/operators'
import { provideMockActions } from '@ngrx/effects/testing'
import { cold, hot } from 'jasmine-marbles'
import {
  SetActiveBrief,
  LoadBrief,

} from './brief.actions'
import { BriefEffects } from './brief.effects'
import { BriefDataLocalService } from './local/brief-data.service'
import { AppSettingsService } from '../../../../../../libs/df-app-core/src'
import { SettingsService } from '../../services/settings.service'
import { BriefMapperService } from '../../services/mappers/brief-mapper.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'
import { CoreMapperService } from '../../services/mappers/core-mapper.service'
import { BriefDataService } from './brief-data.service'
import { briefs } from '../../../devdata/data'

describe('BriefEffects', () => {
  debugger
    let mockStore: MockStore<any>
    let actions$: Observable<any>
    let briefEffects: BriefEffects
    let service: BriefDataService

    const initialState =   {
      activeBrief: null,
      brief: null,
      directions: null,
      recommendations: null,
      attachments: null,
      statusLookups: null,
      divisionLookups: null
    } 

    beforeEach(async(() => { 
      const configure: ConfigureFn = testBed => {
          TestBed.configureTestingModule({
       imports: [HttpClientTestingModule],
       providers:
            [ 
              SettingsService,
              BriefMapperService,
              BriefDataLocalService,
              HttpClient,
              BriefEffects,
              {provide: CoreMapperService,
              useClass: BriefMapperService
              },
              {provide: BriefDataService,
              useClass: BriefDataLocalService
            },
              { provide: AppSettingsService, 
                useClass: SettingsService 
              },

            { provide: Store,
              useValue: {
                pipe: jest.fn()
              }
             },
                BriefEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState}),
            ],
          })
        }
         configureTests(configure).then(testBed => {
          mockStore = TestBed.get(Store)
          let state = {...initialState, activeBriefId: '2'}
          mockStore.setState(state)
          briefEffects = TestBed.get(BriefEffects)
          service = TestBed.get(BriefDataLocalService)
        })
    }))
  
  it('should be created', () => {
    expect(briefEffects).toBeTruthy()
  })

  it('should Load Deck Items', inject([BriefDataService], (service:BriefDataService)  => {
    const action = new SetActiveBrief(null)
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: {data: briefs[0], loading: false} });
    const expected = cold('--b', {b: new LoadBrief({data: briefs[0],loading: false})})
    service.getActiveBrief = jest.fn(() => response)

    expect(briefEffects.setActiveBrief$ ).toBeObservable(expected)
  }))

})

