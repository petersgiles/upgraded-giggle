import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 

import { ConfigureFn, configureTests } from '../../../../../../../libs/df-testing'
import { Store } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing'
import { BriefDocumentComponent } from './brief-document.component'
import { Injector} from '@angular/core'
import { SafeHtmlPipe } from '../../../../../../../libs/df-pipes/src/lib/safe-html.pipe'
import { DfPipesModule } from '../../../../../../../libs/df-pipes/src/lib/df-pipes.module'
import { Observable, of} from 'rxjs'
import { BriefDataService } from '../../../reducers/brief/brief-data.service'
import { BriefDataLocalService } from '../../../reducers/brief/local/brief-data.service'
import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import { AppSettingsService } from '../../../../../../../libs/df-app-core/src'
import { SettingsService } from '../../../services/settings.service'
import { BriefMapperService } from '../../../services/mappers/brief-mapper.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'

const briefDataServiceFactory = (
  http: HttpClient,
  settings: AppSettingsService,
  mapping: BriefMapperService
  ) => {
    let injector = Injector.create([{
      provide: BriefDataLocalService,
      deps: [settings, http, mapping]
    }])
    
    return injector.get(BriefDataLocalService)
  }

  const appDataServiceFactory  = (
  ) => {
   return new SettingsService()
  } 

  /* const appDataServiceFactory = (
  
    ) => {
      let injector = Injector.create([{
        provide: SettingsService,
        deps: []
      }])
      
      return injector.get(SettingsService)
    } */
  
describe('BriefDocumentComponent', () => {
  debugger
  let component: BriefDocumentComponent;
  let fixture: ComponentFixture<BriefDocumentComponent>;
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let settingsService: SettingsService
  let httpTestingController: HttpTestingController
 
  const initialState: fromBrief.State = {
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
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BriefDocumentComponent],
      imports: [DfPipesModule, HttpClientTestingModule],
      providers:
      [ 
       // AppSettingsService,
        SettingsService,
        BriefMapperService,
        SafeHtmlPipe,
        {
          provide: AppSettingsService,
          useFactory:  appDataServiceFactory, deps:[],
       },   
       {
        provide: AppSettingsService,
        useValue: settingsService
      },
        {
          provide: BriefDataService,
          useFactory: briefDataServiceFactory,
          deps: [HttpClient, AppSettingsService, BriefMapperService]
        },
       
      { provide: Store,
        useValue: {
          pipe: jest.fn()
        }
       },
        provideMockActions(() => actions$),
        provideMockStore({ initialState
    }),]
    })
   }
   configureTests(configure).then(testBed => {
    fixture = TestBed.createComponent(BriefDocumentComponent);
    component = fixture.componentInstance
    mockStore = TestBed.get(Store)
    initialState.brief = getBrief()
    mockStore.overrideSelector(fromBrief.selectBriefState, initialState.brief)    
    settingsService = TestBed.get(SettingsService)
    httpTestingController = TestBed.get(HttpTestingController)
    
    fixture.detectChanges();  
  })
  
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should get the Brief', () => {
    mockStore
     .select(fromBrief.selectBriefState)
     .subscribe(result => {
        expect(result.fileLeafRef).toEqual('0733738d-5946-ca15-7797-eb31615111f2.docx')   
   })})

 })

 function getBrief(){
  let brief = {briefDivision: {id: 1, title: undefined}, briefStatus: {id: 1, title: undefined}, dLM: null, dueDate: null,
  editor: {id: null, title: null},
  fileLeafRef: '0733738d-5946-ca15-7797-eb31615111f2.docx',
  id: 1,
  modified: undefined,
  order: 999,
  policy: {id: 1, title: 'Sample Policy'},
  policyDirection: undefined,
  reference: 'BRIEF-19-000001',
  securityClassification: 'UNCLASSIFIED',
  subPolicy: {id: 1, title: 'SubPolicy One'},
  title: 'Sample Policy Brief 1'
  }
  return brief
 }