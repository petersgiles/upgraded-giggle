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
import { BriefDiscussionComponent } from './brief-discussion.component'
import { Observable, of} from 'rxjs'
import { DiscussionType } from '../../../models'
import * as fromDiscussion from '../../../reducers/discussion/discussion.reducer'
import { MdcDialog, Overlay } from '@angular-mdc/web'

describe('BriefDiscussionComponent', () => {
  let component: BriefDiscussionComponent;
  let fixture: ComponentFixture<BriefDiscussionComponent>;
  let mockStore: MockStore<any>
  let actions$: Observable<any>
 
  const initialState: fromDiscussion.State = {
    timeFormat: 'dateFormat',
    activeChannel: DiscussionType.Agency,
    channels: [DiscussionType.Agency],
    activeComment: null,
    comments: null,
    discussion: null
  }
 
  beforeEach(async(() => {
    const configure = (testBed: TestBed) => {
    testBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BriefDiscussionComponent],
      providers:
      [ 
        MdcDialog, Overlay,
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
    fixture = testBed.createComponent(BriefDiscussionComponent);
    component = fixture.componentInstance
    mockStore = testBed.get(Store)
    initialState.discussion = getDiscussions()
    mockStore.overrideSelector(fromDiscussion.selectDiscussionState, initialState.discussion)  
    mockStore.overrideSelector(fromDiscussion.selectActiveCommentState, initialState.activeComment) 
    //The brief is passed from the parent component - brief-reader.component. This is required for the @input hence:
    component.brief = getBrief()
    fixture.detectChanges();  
  })
  
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  })

 
  it('should return two discussions', () => {
    mockStore
     .select(fromDiscussion.selectDiscussionState)
     .subscribe(result => {
        expect(result.length).toEqual(2) 
        expect(result[0].author.name).toEqual('David McGrath')   
   })})

 })

 function getDiscussions(){
  
  let discussions = [{author:{color: 'rgb(84, 70, 126)', name: 'David McGrath',username: 'David McGrath'},
  briefId: '1',
  channel: 'Agency',
  created: '2019-04-10T02:19:18Z',
  id: '15',
  level: 1,
  parent: null,
  text: 'There is probably no causal link between the responsive critical evaluation and any fundamental dichotomies of the set of constraints. However what might be described as the inductive complementary quality may be implicitly important. The mechanism-independent integrated development cannot always help us.  In a very real sense, the criterion of mindset provides a harmonic integration with the quality driven methodological individuality. Everything should be done to expedite the philosophy of commonality and standardization.  ↵The Dominant Non-Referent Feeling.↵<p>It is quite instructive to compare the principle of the major theme of the major theme of the pure capacity and the consolidation of the closely monitored economico-social simulation. In the latter case, the feasibility of the core business should empower employees to produce the concept of element. Everything should be done to expedite the calculus of consequence. Therefore a maximum of flexibility is required.'},
  {author:{color: 'rgb(84, 70, 126)', name: 'David McGrath',username: 'David McGrath'},
  briefId: '2',
  channel: 'Agency',
  created: '2019-04-10T02:19:18Z',
  id: '19',
  level: 1,
  parent: null,
  text: 'It was Livia McBadden who first pointed out that an extrapolation of the legitimate on-going issue specifies the overall efficiency of The logical  program. The advent of the targeted heuristic support demonstrably stresses the negative aspects of any economic formulation.  An initial appraisal makes it evident that an overall understanding of a unique facet of three-tier diffusible formulation provides the context for the targeted superficial faculty. Therefore a maximum of flexibility is required.  Thus, the large portion of the co-ordination of communication may be functionally important. The hypothetical impersonal teleology underlines the significance of the directive equivalent teleology or the critical temperamental principle.↵<p>In particular, the consolidation of the the bottom line exceeds the functionality of the arbitrary resources on a strictly limited basis.  '}]
  return discussions
 }

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
