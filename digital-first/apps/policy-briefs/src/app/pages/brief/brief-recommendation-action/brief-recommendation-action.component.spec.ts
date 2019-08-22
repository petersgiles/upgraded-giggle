


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
import { BriefRecommendationActionComponent } from './brief-recommendation-action.component';
import { FormBuilder } from '@angular/forms'
import { Store, select} from '@ngrx/store'
import { SafeHtmlPipe } from '../../../../../../../libs/df-pipes/src/lib/safe-html.pipe'
import { DfPipesModule } from '../../../../../../../libs/df-pipes/src/lib/df-pipes.module'
import { Router, ActivatedRoute,  ParamMap,  convertToParamMap } from '@angular/router'
import { Observable, of } from 'rxjs'
import { MdcDialog, Overlay } from '@angular-mdc/web'

describe('BriefRecommendationActionComponent', () => {
  let component: BriefRecommendationActionComponent;
  let fixture: ComponentFixture<BriefRecommendationActionComponent>
  let recommendation
  let brief
  let router: Router

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ DfPipesModule],
      declarations: [BriefRecommendationActionComponent],
      providers:
      [ 
        SafeHtmlPipe,
        FormBuilder, 
        Overlay,
        MdcDialog, 
        { provide: Store,
          useValue: {
            pipe: jest.fn(),
            dispatch: jest.fn()
          }
         },
         {
          provide: Router,
          useValue: {get: jest.fn()}
        },
  
   { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ parent: '' }))}},
  
      ]
    })
   }
   configureTests(configure).then(testBed => {
    fixture = TestBed.createComponent(BriefRecommendationActionComponent);
    component = fixture.componentInstance
    router = TestBed.get(Router)
    brief = idFromLookup(getBrief())
    recommendation = idFromLookup(getRecommendation())

    component.form.patchValue({
      recommendation: recommendation,
      brief: brief,
      response: 'Agreed'})

    //fixture.detectChanges()
  })
  
  }))
 
  it('should create', () => {
    expect(component).toBeTruthy()
  })

 })

 function idFromLookup(lookupValue: any) {
  if(lookupValue) {
    return lookupValue['ID'] || lookupValue['Id'] || lookupValue['id']
  }

  return null
}

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


 


