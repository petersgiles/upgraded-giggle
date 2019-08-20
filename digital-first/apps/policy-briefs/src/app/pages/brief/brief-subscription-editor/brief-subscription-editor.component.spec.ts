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
import { BriefSubscriptionEditorComponent } from './brief-subscription-editor.component'
import { MdcDialog, Overlay, MdcIconButtonModule } from '@angular-mdc/web'
import { FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute,  ParamMap,  convertToParamMap } from '@angular/router'
import { Observable, of } from 'rxjs'
import { Store, select} from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import * as fromLookup from '../../../reducers/lookups/lookup.reducer'
import { selectAppBackgroundColour, Config } from '../../../../../../../libs/df-app-core/src'

describe('BriefSubscriptionEditorComponent', () => {

  let component: BriefSubscriptionEditorComponent;
  let fixture: ComponentFixture<BriefSubscriptionEditorComponent>;
  let router: Router
  let mockStore: MockStore<any>
  let config: Config
  let background$: Observable<string>
  let documentStatusList$: Observable<any[]>
  let activities$: Observable<any[]>
 
  const initialState: fromBrief.State = {
    activeBrief: null,
  brief: null,
  directions: null,
  recommendations: null,
  attachments: null,
  }

  const appState = {
    config
  }

  const lookupState = {
    policies: [],
    subpolicies: [],
    commitments: [],
    classifications: [],
    dlms: [],
    statuses: [],
    divisions: [],
    activities: []
  }

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MdcIconButtonModule],
      declarations: [BriefSubscriptionEditorComponent],
      providers:
      [MdcDialog, Overlay, FormBuilder,
        {
          provide: Router,
          useValue: {get: jest.fn()}
        },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: '' }))}},
        { provide: Store,
          useValue: {
            pipe: jest.fn(),
            dispatch: jest.fn()
          }
         },
         provideMockStore({ initialState
         })]
    })
   }
   configureTests(configure).then(testBed => {
    fixture = TestBed.createComponent(BriefSubscriptionEditorComponent);
    component = fixture.componentInstance
    router = TestBed.get(Router)
    mockStore = TestBed.get(Store)
    initialState.brief = getBrief()
    mockStore.overrideSelector(fromBrief.selectBriefState, initialState.brief)
    appState.config = getConfig()
    mockStore.overrideSelector(selectAppBackgroundColour, appState.config.header.backgroundColour) 

    let newLookupState = {...lookupState, activities: getActivities(), statuses: getStatuses()}
    mockStore.overrideSelector(fromLookup.selectLookupStatusesState, newLookupState.statuses)
    mockStore.overrideSelector(fromLookup.selectLookupActivitiesState, newLookupState.activities)

    fixture.detectChanges()
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

   it('should return the background colour', () => {
    mockStore
    .select(selectAppBackgroundColour)
    .subscribe(colour => {
      expect(colour).toBe('#455a64')
  })
  })

  it('observable should return colour', () => {
    background$ = mockStore.pipe(
      select(selectAppBackgroundColour))
      background$.subscribe(colour => {
        expect(colour).toBe('#455a64')
        }
      )
   })

   it('should get the activities', () => {
    mockStore
     .select(fromLookup.selectLookupActivitiesState)
     .subscribe(result => {
        expect(result[0].caption).toEqual('Decision')   
   })})

   it('observable should return all activities', () => {
    activities$ = mockStore.pipe(
      select(fromLookup.selectLookupActivitiesState))
      background$.subscribe(activities => {
        expect(activities.length).toBe(7)
        }
      )
   })

   it('should get the statuses', () => {
    mockStore
     .select(fromLookup.selectLookupStatusesState)
     .subscribe(result => {
        expect(result[0].caption).toEqual('In Draft')   
   })})

   it('observable should return all statuses', () => {
    documentStatusList$ = mockStore.pipe(
      select(fromLookup.selectLookupStatusesState))
      background$.subscribe(statuses => {
        expect(statuses.length).toBe(3)
        }
      )
   })

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

 function getConfig(){
  const defaults: Config = {
    webId: null,
    siteId: null,
    header: {
      title: 'Unconfigured Application',
      backgroundColour: '#455a64',
      classification: 'UNCLASSIFIED',
      logo: {
        image: 'assets/crest.png',
        url: '/'
      },
      apps: []
    }
  }
  return defaults
}

function getActivities(){
  const activities = [
    {
    id: '1',
    icon: 'people',
    colour: 'Pink',
    order: 1,
    caption: 'Decision'},
    {id: '2',
    icon: 'people',
    colour: 'Pink',
    order: 2,
    caption: 'New Comments'},
    {id: '3',
    icon: 'people',
    colour: 'Pink',
    order: 3,
    caption: 'New Documents'},
    {id: '4',
    icon: 'people',
    colour: 'Pink',
    order: 4,
    caption: 'Updates and Changes'}]
    return activities
}

function getStatuses(){
  let statuses = [
    {id: '1',
    icon: 'people',
    caption: 'In Draft',
    colour: 'Pink',
    order: 1},
    {id: '2',
    icon: 'playlist_add_check',
    caption: 'Ready',
    colour: 'GhostWhite',
    order: 2},
    {id: '3',
    icon: 'cancel_presentation',
    caption: 'Cancelled',
    colour: 'Crimson',
    order: 3}]
    return statuses
}