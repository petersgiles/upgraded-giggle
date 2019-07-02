import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import "zone.js/dist/proxy";
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch'

import { ErrorHandler,  Injector} from '@angular/core'
import { inject, TestBed, getTestBed, async, fakeAsync } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'

import { AppEffects } from '../../../../libs/df-app-core/src/lib/reducers/app/app.effects'
import { UserEffects } from '../../../../libs/df-app-core/src/lib/reducers/user/user.effects'
import {
  StartAppInitialiser,
  FinishAppInitialiser,
  GetAppConfiguration,
  LoadAppConfiguration,
  AppActionTypes
} from '../../../../libs/df-app-core/src/lib/reducers/app/app.actions'

import { 
  GetCurrentUser,
  SetCurrentUser,
  GetUserOperations,
  SetUserOperations,
  SetUserOperationDefaults
} from '../../../../libs/df-app-core/src/lib/reducers/user/user.actions'

import { AppDataService } from '../../../../libs/df-app-core/src/lib/services/app-data.service'
import { AppConfigService } from '../../../../libs/df-app-core/src/lib/services/config/config.service'
import { AppSettingsService }  from '../../../../libs/df-app-core/src/lib/services/app-settings.service'
import { Observable } from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { DevelopConfigService } from './services/config/develop/develop-config.service'
import { DevelopAppDataService } from './services/app-data/develop/develop-app-data.service'
import { AppUserOperationsService } from '../../../../libs/df-app-core/src/lib/services/app-user-operations.service'
import { CommitmentsReaderOperationsService } from './services/app-data/app-operations'
import { SettingsService } from './services/settings.service'
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'
import { cold, hot } from 'jasmine-marbles'

const configServiceFactory = (
  settings: AppSettingsService,
  http: HttpClient,
  
) => {
  let injector = Injector.create([{
    provide: DevelopConfigService,
    useValue: {
      getConfig: () => Observable.create((obs: any)=>{
        obs.next(getConfigData())
      })
    },
    deps: [http, settings]
  }])
  
  return injector.get(DevelopConfigService)
}

const appDataServiceFactory  = (
  //settings: AppSettingsService
  
) => {
 return new DevelopAppDataService()
}

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
)

        /* Tests for Config */
/*describe('AppModule_Config', () => {
  debugger
  let httpClient: HttpClient
  let appEffects: AppEffects
  let actions: Observable<any>
  let httpTestingController: HttpTestingController
  let settingService: SettingsService
  
  beforeEach(() => {
    debugger
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        ErrorHandler,
        AppSettingsService,
        SettingsService,
        AppEffects,
        provideMockActions(() => actions),
        {
          provide: AppConfigService,
          useFactory: configServiceFactory,
          deps: [AppSettingsService, HttpClient]
        },
        {
          provide: AppSettingsService,
          useValue: settingService
        }
      ]
     
    })
    appEffects = TestBed.get(AppEffects)
    httpTestingController = TestBed.get(HttpTestingController)
    httpClient = TestBed.get(HttpClient)
    settingService = TestBed.get(SettingsService)
  })
 
  it('service should be created', inject([DevelopConfigService], (service: DevelopConfigService) => {
    expect(service).toBeTruthy()
  }))

   it('App effect should be created', () => {
    expect(appEffects).toBeTruthy()
  }) 

  it('effect should get config', async (() => {
    const action = new GetAppConfiguration()
    const outcome = new LoadAppConfiguration(getConfigData())
    
    actions = hot('a', { a: action });
    const expected = cold('b', { b: outcome })

    appEffects.getAppConfiguration$.subscribe((resp: any) => {
      expect(resp.type).toEqual(AppActionTypes.LoadAppConfiguration)
      expect(resp.payload).toEqual(getConfigData())
    })
  }))


  it('get asset using http', () => {
    httpClient.get('/assets/commitments-reader.txt').subscribe(resp => {
      expect(resp).toEqual(getConfigData())
    })
    
    const req = httpTestingController.expectOne('/assets/commitments-reader.txt')
    req.flush(getConfigData())
  })

   it('get config service', inject([HttpClient, SettingsService], (http: HttpClient, settings: SettingsService) => {
     let configService = new DevelopConfigService(http, settings)
    configService.getConfig().subscribe(resp => {
      expect(resp.payload).toEqual(getConfigData())
    })
    
    
    const req = httpTestingController.expectOne('/assets/commitments-reader.txt');
    req.flush(getConfigData())
  }))
})*/

          /* Tests for User and user operations */
describe('AppModule_User', () => {
  debugger
  let userEffects: UserEffects
  let actions: Observable<any>
  let httpTestingController: HttpTestingController
  let settingService: SettingsService
  
  beforeEach(() => {
    debugger
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        UserEffects,
        DevelopAppDataService,
        CommitmentsReaderOperationsService,
        provideMockActions(() => actions),
        {
           provide: AppDataService,
           useClass: DevelopAppDataService,
           useValue: {
            getCurrentUser: jest.fn(),
            SetCurrentUser: jest.fn(),
            SetUserOperationDefaults: jest.fn(),
            GetUserOperations: jest.fn(),
          }
        },
        {
           provide: AppUserOperationsService,
           useValue: CommitmentsReaderOperationsService
        }
      ]
     
    })
    userEffects = TestBed.get(UserEffects)
    httpTestingController = TestBed.get(HttpTestingController)
    settingService = TestBed.get(SettingsService)
  })
          
  it('User service should be created', inject([DevelopAppDataService], (service: DevelopAppDataService) => {
        expect(service).toBeTruthy()
  }))

  it('Operations service should be created', inject([CommitmentsReaderOperationsService], (service: CommitmentsReaderOperationsService) => {
    expect(service).toBeTruthy()
}))

  it('User effect should be created', () => {
        expect(userEffects).toBeTruthy()
  }) 

  it('effect should get config', async (inject([DevelopAppDataService, CommitmentsReaderOperationsService], (userService: DevelopAppDataService, opsService: CommitmentsReaderOperationsService) => {
    const action = new GetCurrentUser(null)
    const getUserOutcome = new SetCurrentUser(getUserData())
    const setUserOpsOutcome = new SetUserOperationDefaults(opsService.operations)
    const getUserOps = new GetUserOperations(null)
    
    actions = hot('a', { a: action })

    const response = cold('-a|', { a: getUserData() })
    const expected_1 = cold('--b', { b: getUserOutcome })
    userService.getCurrentUser = jest.fn(() => response)
    
    const expected_2 = cold('--c', { c: setUserOpsOutcome })
   
    const expected_3 = cold('--d', { c: getUserOps })
    userService.getCurrentUserOperations = jest.fn(() => response)

    expect(userEffects.getCurrentUser$).toBeObservable(expected_1)
    /* userEffects.getCurrentUser$.subscribe((resp: any) => {
      expect(resp.type).toEqual(AppActionTypes.LoadAppConfiguration)
      expect(resp.payload).toEqual(getConfigData())
    }) */
  })))
})

function getConfigData(){
  const data = {
    "header": {
        "apps": [
            {
              "caption": "Dashboard",
              "icon": "dashboard",
              "url": "SitePages/deck.aspx/deck"
            },  {
              "caption": "Activity",
              "icon": "timeline",
              "url": "SitePages/index.aspx/recent"
            },  {
              "caption": "Alerts",
              "icon": "notifications",
              "url": "SitePages/index.aspx/notifications"
            }, {
              "caption": "Permissions",
              "icon": "how_to_reg",
              "url": "_layouts/15/user.aspx",
              "target": "_blank"
            },  {
              "caption": "Admin",
              "icon": "settings",
              "url": "/SitePages/admin.aspx/admin"
            }
          ],
          "bookColour": "#e54430",
          "title": "Delivery Module",
          "classification": "",
          "bookType": "red",
          "logo": {
            "image": "assets/crest.png",
            "url": "/",
            "title": "Return to home page"
         },
    },
    "webId": "C9013762-2FED-49D7-8EA2-1DD650C7010E",
    "siteId": "52233101-86F9-46D7-BBC0-22139AF854EE",
}
return data
}

function getUserData(){
  const data = {
          isSiteAdmin: true,
          login: "guest",
          name: "Guest User",
          roles: ["ROLE_OWNERS"],
          systemUserKey: "guest",
          userid: 0
        }
  return data
}