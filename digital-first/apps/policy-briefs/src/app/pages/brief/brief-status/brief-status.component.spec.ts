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
import { BriefStatusComponent } from './brief-status.component'
import { FormBuilder } from '@angular/forms'
import {  Overlay } from '@angular-mdc/web'
import { Store, select} from '@ngrx/store'
import { Observable, BehaviorSubject } from 'rxjs'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import * as fromLookup from '../../../reducers/lookups/lookup.reducer'
import { GetLookupStatuses } from '../../../reducers/lookups/lookup.actions'
import { briefstatuses  } from '../../../../../../../devdata/data'
import * as fromBrief from '../../../reducers/brief/brief.reducer'

describe('BriefStatusComponent', () => {

  let component: BriefStatusComponent;
  let fixture: ComponentFixture<BriefStatusComponent>;
  let documentStatusList$: Observable<any>
  let mockStore: MockStore<any>
  let actions$: Observable<any>
 
  const initialState: fromLookup.State = fromLookup.initialState

  const briefState: fromBrief.State =  fromBrief.initialState

  beforeEach(async(() => {
    const configure = (testBed: TestBed) => {
    testBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BriefStatusComponent],
      providers:
      [ 
        FormBuilder, 
        Overlay,
        { provide: Store,
          useValue: {
            pipe: jest.fn(),
            dispatch: jest.fn()
          }
         },
         provideMockActions(() => actions$),
        provideMockStore({ initialState})
      ]
    })
   }
   configureTests(configure).then(testBed => {
    fixture = testBed.createComponent(BriefStatusComponent);
    component = fixture.componentInstance
    mockStore = testBed.get(Store)
    let state = {...initialState, statuses: briefstatuses}
    mockStore.setState(state)
    mockStore.overrideSelector(fromLookup.selectLookupStatusesState, state.statuses)  
    mockStore.overrideSelector(fromBrief.selectBriefStatusState , getBrief())  
    //documentStatusList$ = new BehaviorSubject(statuslist)
    //component.form.patchValue(defaultValues)

    fixture.detectChanges()
  })
  
  }))
 
  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should show statuses in Behavior Subject', () => {
    documentStatusList$ = mockStore.pipe(
      select(fromLookup.selectLookupStatusesState)
    )   
    documentStatusList$.subscribe(statuses => {
      expect(statuses[0].Title).toBe('In Draft')
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