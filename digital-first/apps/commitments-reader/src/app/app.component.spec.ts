import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import "zone.js/dist/proxy";
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch'
import { ErrorHandler, Injector} from '@angular/core'
import { inject, TestBed, getTestBed, async, fakeAsync } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'
import { AppModule } from './app.module'
//import { AppComponent } from './app.component'
import { AppEffects } from '../../../../libs/df-app-core/src/lib/reducers/app/app.effects'
import {
  StartAppInitialiser,
  FinishAppInitialiser,
  GetAppConfiguration,
  LoadAppConfiguration
} from '../../../../libs/df-app-core/src/lib/reducers/app/app.actions'

import { AppConfigService } from '../../../../libs/df-app-core/src/lib/services/config/config.service'
import { AppSettingsService }  from '../../../../libs/df-app-core/src/lib/services/app-settings.service'
//import { configServiceProvider } from './services/config/config.service.factory'
import { Actions } from '@ngrx/effects'
import { Observable, empty, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { provideMockActions } from '@ngrx/effects/testing'
import { DevelopConfigService } from './services/config/develop/develop-config.service'
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
        obs.next(getData())
      })
    },
    deps: [http, settings]
  }])
  
  return injector.get(DevelopConfigService)
 //return new DevelopConfigService(http, settings)
}

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

describe('AppModule', () => {
  debugger
  let httpClient: HttpClient
  let appEffects: AppEffects
  let actions: Observable<any>//AppActionTypes.StartAppInitialiser
  //let configService: DevelopConfigService
  let httpTestingController: HttpTestingController
  let settingService: SettingsService
  let errorHandler: ErrorHandler
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    debugger
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        ErrorHandler,
        //DevelopConfigService, 
       // AppConfigService,
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
    errorHandler = TestBed.get(ErrorHandler)
    appEffects = TestBed.get(AppEffects)
    //configService = TestBed.get(DevelopConfigService);
    httpTestingController = TestBed.get(HttpTestingController)
    httpClient = TestBed.get(HttpClient)
    settingService = TestBed.get(SettingsService)
  });
 
  it('service should be created', inject([DevelopConfigService], (service: DevelopConfigService) => {
    expect(service).toBeTruthy();
  }));

   it('should be created', () => {
    expect(appEffects).toBeTruthy();
  }); 

  it('effect should get config', async() => {
   
    
    const action = new GetAppConfiguration()
    const outcome = new LoadAppConfiguration(getData())
    
    actions = hot('a', { a: action });
    const expected = cold('b', { b: outcome });
   
    expect(appEffects.getAppConfiguration$).toBeObservable(expected)
    await appEffects.getAppConfiguration$.subscribe(resp => {
      expect(resp).toEqual(getData())
    })
  });


  it('get http', () => {
    httpClient.get('/assets/commitments-reader.txt').subscribe(resp => {
      expect(resp).toEqual(getData())
    });
    

    const req = httpTestingController.expectOne('/assets/commitments-reader.txt');
    req.flush(getData())
  })

   it('get config service', inject([HttpClient, SettingsService], (http: HttpClient, settings: SettingsService) => {
     let configService = new DevelopConfigService(http, settings)
    configService.getConfig().subscribe(resp => {
      expect(resp).toEqual(getData())
    })
    
    
    const req = httpTestingController.expectOne('/assets/commitments-reader.txt');
    req.flush(getData())
  }))

})

function getData(){
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