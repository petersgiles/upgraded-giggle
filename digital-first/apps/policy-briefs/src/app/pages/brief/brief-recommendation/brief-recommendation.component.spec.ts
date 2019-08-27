import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 

import { ConfigureFn, configureTests } from '../../../../../../../libs/df-testing'

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MdcDialog, Overlay } from '@angular-mdc/web'
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router'
import { Store} from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { Observable, of} from 'rxjs'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import { BriefRecommendationComponent } from './brief-recommendation.component';
import { SafeHtmlPipe } from '../../../../../../../libs/df-pipes/src/lib/safe-html.pipe'
import { DfPipesModule } from '../../../../../../../libs/df-pipes/src/lib/df-pipes.module'
import { FormBuilder } from '@angular/forms'

describe('BriefRecommendationComponent', () => {

  let component: BriefRecommendationComponent;
  let fixture: ComponentFixture<BriefRecommendationComponent>;
  let mockStore: MockStore<any>
  let actions$: Observable<any>


  const initialState: fromBrief.State = {
    activeBrief: null,
    brief: null,
    directions: null,
    subscriptions: null,
    attachments: null,
  }
  
 
  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [DfPipesModule],
      declarations: [BriefRecommendationComponent],
      providers:
      [
        SafeHtmlPipe,
        FormBuilder,
        { provide: Store,
        useValue: {
          pipe: jest.fn()
        }
       },
        provideMockActions(() => actions$),
        provideMockStore({ initialState,
    })]
    })
   }
   configureTests(configure).then(testBed => {
    fixture = TestBed.createComponent(BriefRecommendationComponent);
    component = fixture.componentInstance
    mockStore = TestBed.get(Store)
    let state = {...initialState, brief: getBrief()}
    mockStore.setState(state)
    mockStore.overrideSelector(fromBrief.selectBriefState, state.brief)  
   
    fixture.detectChanges();  
  })
  
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should return the brief', () => {
    mockStore
     .select(fromBrief.selectBriefState)
     .subscribe(brief => {
       expect(brief.reference).toBe('BN:636904955575056876')
   })
  }) 
  

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
    title: "The Integration Of Hypothetical Concept",
    recommendations: [getRecommendation()]
    }
  return brief
 }

 function getRecommendation(){
  const recommendation = {
    ID: 1,
    Title: 'Test recommendation',
    Recommendation: 'This is a recomendation',
    Outcome1: 'Agree',
    Outcome2: null,
    Outcome3: null,
    Colour: 'rgb(84, 70, 126)',
    SortOrder: '1',
    Policy: null,
    SubPolicy: null,
    //Brief: getBrief()
  }
  return recommendation
}


 

