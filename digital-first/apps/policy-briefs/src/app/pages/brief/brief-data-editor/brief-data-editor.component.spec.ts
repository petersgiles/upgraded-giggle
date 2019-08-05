import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 

import { ConfigureFn, configureTests } from '../../../../../../../libs/df-testing'
import { Store, createSelector } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BriefDataEditorComponent } from './brief-data-editor.component'
import { ParamMap, ActivatedRoute, Router,  convertToParamMap } from '@angular/router'
import { FormBuilder } from '@angular/forms';
import { MdcDialog, Overlay } from '@angular-mdc/web'
import { Observable, of} from 'rxjs'
import { classifications, dlms } from '../mock-data'
import { policies, subpolicies } from 'apps/policy-briefs/src/devdata/data'
import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'

describe('BriefDataEditorComponent', () => {
  let component: BriefDataEditorComponent;
  let fixture: ComponentFixture<BriefDataEditorComponent>;
  let mockStore: MockStore<any>
  let actions$: Observable<any>
 
 
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
      declarations: [BriefDataEditorComponent],
      providers:
      [ 
        Overlay,
        FormBuilder,
      {
        provide: Router,
        useValue: {get: jest.fn()}
      },
      { provide: Store,
        useValue: {
          pipe: jest.fn()
        }
       },
       { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ parent: '' }))}},
        provideMockActions(() => actions$),
        provideMockStore({ initialState
    }),]
    })
   }
   configureTests(configure).then(testBed => {
    fixture = TestBed.createComponent(BriefDataEditorComponent);
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