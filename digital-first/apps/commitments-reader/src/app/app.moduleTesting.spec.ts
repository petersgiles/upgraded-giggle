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
import { inject, TestBed, getTestBed, async} from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'

import { Store, createSelector, select, Action } from '@ngrx/store'

import { AppEffects } from '../../../../libs/df-app-core/src/lib/reducers/app/app.effects'
import { UserEffects } from '../../../../libs/df-app-core/src/lib/reducers/user/user.effects'
import {
  StartAppInitialiser,
  FinishAppInitialiser,
  GetAppConfiguration,
  LoadAppConfiguration,
  AppActionTypes,
} from '../../../../libs/df-app-core/src/lib/reducers/app/app.actions'

import { 
  GetCurrentUser,
  SetCurrentUser,
  GetUserOperations,
  SetUserOperations,
  SetUserOperationDefaults
} from '../../../../libs/df-app-core/src/lib/reducers/user/user.actions'

import {
  ROLE_VISITORS,
  ROLE_MEMBERS,
  ROLE_OWNERS,
  OPERATION_RIGHT_WRITE,
  OPERATION_RIGHT_HIDE,
  OPERATION_RIGHT_READ,
  AppState
} from '../../../../libs/df-app-core/src/'


import {
  OPERATION_PMO_HANDLING_ADVICE,
  OPERATION_PMC_HANDLING_ADVICE
} from './services/app-data/app-operations'

import { Config } from '../../../../libs/df-app-core/src/lib/services/config/config-model'
import { AppDataService } from '../../../../libs/df-app-core/src/lib/services/app-data.service'
import { AppConfigService } from '../../../../libs/df-app-core/src/lib/services/config/config.service'
import { AppSettingsService }  from '../../../../libs/df-app-core/src/lib/services/app-settings.service'
import { Observable, Subject, ReplaySubject, of } from 'rxjs'
import { take, map, skip } from 'rxjs/operators'
import { provideMockActions } from '@ngrx/effects/testing'
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { DevelopConfigService } from './services/config/develop/develop-config.service'
import { DevelopAppDataService } from './services/app-data/develop/develop-app-data.service'
import { AppUserOperationsService } from '../../../../libs/df-app-core/src/lib/services/app-user-operations.service'
import { CommitmentsReaderOperationsService } from './services/app-data/app-operations'
import { SettingsService } from './services/settings.service'
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'
import { cold, hot } from 'jasmine-marbles'

import { Actions } from '@ngrx/effects'


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
describe('AppModule_Config', () => {
  //debugger
  let httpClient: HttpClient
  let appEffects: AppEffects
  let actions: Observable<any>
  let httpTestingController: HttpTestingController
  let settingService: SettingsService
  
  beforeEach(() => {
    //debugger
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

  it('should start get config again', inject([AppConfigService], (configDatService: AppConfigService) => {

    const action = new GetAppConfiguration()
    const outcome = new LoadAppConfiguration(getConfigData())
    
    actions = hot('a', { a: action });
    const expected = cold('b', { b: outcome })
   expect(appEffects.getAppConfiguration$).toBeObservable(expected)
  }))


  it('get asset using http', () => {
    httpClient.get('/assets/commitments-reader.txt').subscribe(resp => {
      expect(resp).toEqual(getConfigData())
    })
    
    const req = httpTestingController.expectOne('/assets/commitments-reader.txt')
    req.flush(getConfigData())
  })
})

const testOperations = [
  {
    group: ROLE_OWNERS,
    component: [OPERATION_PMO_HANDLING_ADVICE, OPERATION_PMC_HANDLING_ADVICE],
    rights: OPERATION_RIGHT_WRITE
  },
  {
    group: ROLE_MEMBERS,
    component: [OPERATION_PMO_HANDLING_ADVICE, OPERATION_PMC_HANDLING_ADVICE],
    rights: OPERATION_RIGHT_READ
  },
  {
    group: ROLE_VISITORS,
    component: [OPERATION_PMO_HANDLING_ADVICE, OPERATION_PMC_HANDLING_ADVICE],
    rights: OPERATION_RIGHT_HIDE
  }
]

          /* Tests for User and user operations */
describe('AppModule_User', () => {
  //debugger
  let userEffects: UserEffects
  let actions: Observable<any>
  
  beforeEach(() => {
    //debugger
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        UserEffects,
        CommitmentsReaderOperationsService,
        provideMockActions(() => actions),
        {
           provide: AppDataService,
           useFactory:  appDataServiceFactory, deps:[],
        },
        {
            provide:  DevelopAppDataService,
            useValue: {
              getCurrentUser: jest.fn()
            }
        },
        {
           provide: AppUserOperationsService,
           useClass: CommitmentsReaderOperationsService
        }
      ]
     
    })
    userEffects = TestBed.get(UserEffects)
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

  it('effect should get currrent user', async (inject([AppDataService, CommitmentsReaderOperationsService], (userService: AppDataService, opsService: AppUserOperationsService) => {
    const action = new GetCurrentUser(null)
    const getUserOutcome = new SetCurrentUser(getUserData())
    const setUserOpsOutcome = new SetUserOperationDefaults(opsService.operations)
    const getUserOps = new GetUserOperations(null)
    
    actions = hot('-a', { a: action })

    const response = cold('-a|', { a: getUserData() })
    
    const expected = cold('--(bcd)', { b: getUserOutcome, c: setUserOpsOutcome, d: getUserOps})
   
    userService.getCurrentUser = jest.fn(() => response)

    expect(userEffects.getCurrentUser$).toBeObservable(expected)
   
  })))

  it('effect should get currrent user operations', async (inject([AppDataService], (userService: AppDataService) => {
    const action = new GetUserOperations({payload: null})
    const setUserOps = new SetUserOperations(getUserOps())
    
    actions = hot('-a', { a: action })

    const response = cold('-a|', { a: {payload: null} })
    
    const expected = cold('-b', { b: setUserOps})

    expect(userEffects.getUserOperations$).toBeObservable(expected)
   
  })))
})

let store: Store<{}>

describe('App_Init', () => {
  //debugger
  let userEffects: UserEffects
  let appEffects: AppEffects
  let actions$: Observable<any>
  let unsubscribe = new Subject<void>()
  let settingService: SettingsService
  beforeEach(() => {
    //debugger
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        UserEffects,
        AppEffects,
        CommitmentsReaderOperationsService,
        provideMockActions(() => actions$),
        {
           provide: Store,
           useValue: {
             dispatch: jest.fn(),
             pipe: jest.fn()
           }
        },
        {
          provide: AppUserOperationsService,
          useClass: CommitmentsReaderOperationsService
       },
       {
        provide: AppConfigService,
        useFactory: configServiceFactory,
        deps: [AppSettingsService, HttpClient]
      },
      {
        provide: DevelopConfigService,
        useValue: { getConfig: jest.fn()}
      },
      {
        provide: AppSettingsService,
        useValue: settingService
      }
        
      ]
     
    })
    userEffects = TestBed.get(UserEffects)
    appEffects = TestBed.get(AppEffects)
    store = TestBed.get(Store)
    settingService = TestBed.get(SettingsService)
    actions$ = TestBed.get(Actions)
  })

  it('User effect should be created', () => {
    expect(userEffects).toBeTruthy()
  }) 
          
  it('should dispatch a StartAppInitialiser action in App-Init lifecycle', () => {
    const action = new StartAppInitialiser({ environment: null })
    const store = TestBed.get(Store)
    store.dispatch(action)
    const spy = jest.spyOn(store, 'dispatch');

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should start app init', () => {
    const action = new StartAppInitialiser({ environment: null })
    actions$ = hot('-a', { a: action} );
    const expected = cold('-b', {b: new GetAppConfiguration()})
   
    expect(appEffects.startAppInitialiser$).toBeObservable(expected)
  })

})

describe('Mock Store', () => {
  let mockStore: MockStore<AppState>;
  let initialState: AppState = {
    config: {webId: "", siteId: "", header: {}},
    notification: null,
    spinner: false,
    appError: null
  }
  const stringSelector = 'config.siteId'


  const memoizedSelector = createSelector(
    () => initialState,
    state => state.config.siteId
  );
  const selectorWithPropMocked = createSelector(
    () => initialState,
    (state: typeof initialState, add: number) => state.config
  );

  const selectorWithProp = createSelector(
    () => initialState,
    (state: typeof initialState, add: number) => state.config
  );



  let actions$: Observable<any>
  let actions: ReplaySubject<any>
  let appEffects: AppEffects
  let settingService: SettingsService
  let httpClient: HttpClient
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        AppEffects,
        provideMockActions(() => actions),
        provideMockStore({ initialState,
           selectors: [
          { selector: stringSelector, value: "1243242" },
          { selector: memoizedSelector, value: "1243242" }],
      }),
        {
          provide: AppConfigService,
          useFactory: configServiceFactory,
          deps: [AppSettingsService, HttpClient]
        },
        {
          provide: DevelopConfigService,
          useValue: { getConfig: jest.fn()}
        },
        {
          provide: AppSettingsService,
          useValue: settingService
        }
      ],

    });
    
    mockStore = TestBed.get(Store)
    appEffects = TestBed.get(AppEffects)
    settingService = TestBed.get(SettingsService)
    httpClient = TestBed.get(HttpClient)

  })

  it('should set load config in state', ()=> {
      actions = new ReplaySubject(1);
      const getConfigAction = {
        type: AppActionTypes.GetAppConfiguration
      }
      actions.next(getConfigAction)

      appEffects.getAppConfiguration$.subscribe((resp: any) => {
        expect(resp.type).toEqual(AppActionTypes.LoadAppConfiguration)
        expect(resp.payload).toEqual(getConfigData())
    })
    
  })

  it('should set load config in state', ()=> {
      const getConfigAction = {
        type: AppActionTypes.GetAppConfiguration
      }
      mockStore.next(getConfigAction)

      appEffects.getAppConfiguration$.subscribe((resp: any) => {
        expect(resp.type).toEqual(AppActionTypes.LoadAppConfiguration)
        expect(resp.payload).toEqual(getConfigData())
    })
    
  })

  it('should dispatch an action to load data when created', () => {
    spyOn(mockStore, 'dispatch').and.callThrough()
    const action = new GetAppConfiguration()
    mockStore.dispatch(action)
    expect(mockStore.dispatch).toHaveBeenCalledWith(action)
  });

  it('should set the new state', () => {
    mockStore.setState({config:{siteId: getConfigData().siteId, webId: getConfigData().webId, header: {}}, notification: null, spinner: false, appError: null});
    mockStore.pipe(take(1)).subscribe(state => {
      expect(state.config.siteId).toBe("52233101-86F9-46D7-BBC0-22139AF854EE");
    })
  })

  it('should allow mocking of store.select with string selector using provideMockStore', () => {
    const expectedValue = "1243242"

    mockStore
      .select(stringSelector)
      .subscribe(result => expect(result).toBe(expectedValue));
  });

  it('should allow tracing dispatched actions', () => {
    const action = new GetAppConfiguration()
    mockStore.scannedActions$
      .pipe(skip(1))
      .subscribe(scannedAction => expect(scannedAction).toEqual(action));
    mockStore.dispatch(action);
  });

});

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

function getUserOps(){
  const data = {
    data: { groupPermissions: testOperations },
      loading: false,
      error: null
  }
  return data
}
