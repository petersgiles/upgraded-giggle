

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
import { BriefCommitmentsComponent } from './brief-commitments.component'

describe('BriefCommitmentsComponent', () => {
 
  let component: BriefCommitmentsComponent;
  let fixture: ComponentFixture<BriefCommitmentsComponent>;
  let mockStore: MockStore<any>
  let actions$: Observable<any>


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
      declarations: [BriefCommitmentsComponent],
      providers:
      [
       
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
    fixture = TestBed.createComponent(BriefCommitmentsComponent);
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
    title: "The Integration Of Hypothetical Concept"
    }
  return brief
 }

 
