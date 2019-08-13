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
import { inject, async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing'
import { BriefDocumentComponent } from './brief-document.component'
import { Injector} from '@angular/core'
import { SafeHtmlPipe } from '../../../../../../../libs/df-pipes/src/lib/safe-html.pipe'
import { DfPipesModule } from '../../../../../../../libs/df-pipes/src/lib/df-pipes.module'
import { Observable, of, BehaviorSubject} from 'rxjs'
import { first } from 'rxjs/operators'
import { BriefDataService } from '../../../reducers/brief/brief-data.service'
import { BriefDataLocalService } from '../../../reducers/brief/local/brief-data.service'
import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import { AppSettingsService } from '../../../../../../../libs/df-app-core/src'
import { SettingsService } from '../../../services/settings.service'
import { BriefMapperService } from '../../../services/mappers/brief-mapper.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'
import { CoreMapperService } from '../../../services/mappers/core-mapper.service'
import { briefs } from '../../../../../../../devdata/briefs'

const briefDataServiceFactory = (
  http: HttpClient,
  settings: AppSettingsService,
  mapping: BriefMapperService
  
) => {
  let injector = Injector.create([{
    provide: BriefDataLocalService,
    deps: [http, settings, mapping]
  }])
  
  return injector.get(BriefDataLocalService)
}

describe('BriefDocumentComponent', () => {
  let component: BriefDocumentComponent;
  let fixture: ComponentFixture<BriefDocumentComponent>;
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let briefHtml$: BehaviorSubject<string> = new BehaviorSubject(null)

  const initialState: fromBrief.State = {
    activeBrief: null,
    brief: null,
    directions: null,
    recommendations: null,
    attachments: null,
  }
 
  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BriefDocumentComponent],
      imports: [DfPipesModule, HttpClientTestingModule],
      providers:
      [ 
        SettingsService,
        BriefMapperService,
        BriefDataLocalService,
        SafeHtmlPipe,
        HttpClient,
        {provide: CoreMapperService,
        useClass: BriefMapperService
        },
        {provide: BriefDataService,
        useClass: BriefDataLocalService
      },
        { provide: AppSettingsService, 
          useClass: SettingsService 
        },
       {
          provide:  BriefDataLocalService,
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
        expect(result.fileLeafRef).toEqual('LOCALDEV-DAVE-636904955575056876.docx')   
   })})

   it('should get the Brief and use service to get html', inject([BriefDataService], (service: BriefDataService) => {
   
    service.getBriefHtml = jest.fn(() => of({
      data: getHtml(),
      loading: false
    }))
    mockStore
     .select(fromBrief.selectBriefState)
     .subscribe(brief => {
      if (brief && brief.fileLeafRef) {
        const fileLeafRef = brief.fileLeafRef
          .split('.')
          .slice(0, -1)
          .join('.')

        service
          .getBriefHtml(fileLeafRef)
          .pipe(first())
          .subscribe(result => {
            briefHtml$.next(result.data)
          })
      }
      briefHtml$.subscribe(data => {
        expect(data).toEqual(getHtml())
      })
   })}))


 })

 function getBrief(){
  let brief = {
    briefDivision: {id: 1, title: undefined},briefStatus:{id: 1,title: undefined},
    dLM: "Sensitive Personal",
    dueDate: null,
    editor: {id: null, title: null},
    fileLeafRef: "LOCALDEV-DAVE-636904955575056876.docx",
    id: 10,
    modified: undefined,
    order: null,
    policy: {id: 1,title: "Sample Policy"},
    policyDirection: undefined,
    reference: "BN:636904955575056876",
    securityClassification: "PROTECTED",
    subPolicy: {id: 1, title: "SubPolicy One"},
    title: "The Integration Of Hypothetical Concept"
    }
  return brief
 }

 function getHtml(){
   return `<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta http-equiv="Content-Style-Type" content="text/css" /><meta name="generator" content="Aspose.Words for .NET 17.2.0.0" /><title>The Theme Of Secondary Element</title></head><body><div>test</div></body></html>`
 }