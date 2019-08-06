import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 

import { ConfigureFn, configureTests } from '../../../../../../../libs/df-testing'
import { Store, createSelector, select} from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BriefLayoutComponent } from './brief-layout.component'
import * as fromNavigation from '../../../reducers/navigation/navigation.reducer'
import { Observable, of, BehaviorSubject, Subscription} from 'rxjs'
import { MdcDialog, Overlay } from '@angular-mdc/web'
import { Router } from '@angular/router'

describe('BriefLayoutComponent', () => {
  debugger
  let component: BriefLayoutComponent;
  let fixture: ComponentFixture<BriefLayoutComponent>;
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let router: Router


  const initialState: fromNavigation.State = {
      navigationNodes: null,
      navigationTree: null,
      expandedNodes: [],
      activeBriefId: null
  }

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BriefLayoutComponent],
      providers:
      [
        MdcDialog,
        Overlay,
       {
        provide: Router,
        useValue: {navigate: jest.fn()}
      }, 
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
    fixture = TestBed.createComponent(BriefLayoutComponent);
    component = fixture.componentInstance
    mockStore = TestBed.get(Store)
    router = testBed.get(Router)
    let state = {...initialState, navigationNodes: getNodes(), activeBriefId: '1'}
    mockStore.setState(state)
    mockStore.overrideSelector(fromNavigation.selectNavigationNodeState, state.navigationNodes)    
    mockStore.overrideSelector(fromNavigation.selectExpandedNavigationNodeState, initialState.expandedNodes)  
    mockStore.overrideSelector(fromNavigation.selectActiveBriefIdState, state.activeBriefId)  
    fixture.detectChanges();  
  })
   
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should return navigation nodes', () => {
    mockStore
     .select(fromNavigation.selectNavigationNodeState)
     .subscribe(nodes => {
      expect(nodes.length).toEqual(3)
   })
 }) 

 it('should return navigation nodes', () => {
  mockStore
   .select(fromNavigation.selectExpandedNodesState)
   .subscribe(nodes => {
   let x = nodes
 })
}) 
//selectNavigationNodeTreeState
it('should return navigation nodes', () => {
  mockStore
   .select(fromNavigation.selectNavigationNodeTreeState)
   .subscribe(nodes => {
   let x = nodes
 })
}) 

 })

 function getNodes(){
  let nodes = [{active: false, briefId: 1,caption: "Sample Policy",
  colour: "Crimson",
  expanded: true,
  id: "1-1",
  level: 2,
  order: 999,
  children: [{active: false, briefId: 1,caption: "SubPolicy One",
  children: [{active: false,briefId: 1,caption: "Sample Policy Brief 1",
  colour: "Crimson",
  expanded: false,
  id: "1-1-1",
  level: 3,
  order: 999,
  parent: "1-1"}]},
  {active: false, briefId: 10,caption: "The Integration Of Hypothetical Concept",
  colour: "Crimson",
  expanded: false,
  id: "1-1-10",
  level: 3,
  order: null,
  parent: "1-1"}] },
  { 
    active: false,
    briefId: 2,
    caption: "SubPolicy Two",
    colour: "Pink",
    expanded: false,
    id: "1-2",
    level: 2,
    order: 0,
    parent: "1"
  },
  {
    active: false,
    briefId: 3,
    caption: "SubPolicy Three",
    colour: "Green",
    expanded: false,
    id: "1-3",
    level: 2,
    order: 50,
    parent: "1",
    children: [
      {
        active: false,
        briefId: 31,
        caption: "The Projection Of Intuitive Integration",
        colour: "Green",
        expanded: false,
        id: "1-3-31",
        level: 3,
        order: null,
        parent: "1-3"
      },{
        active: false,
        briefId: 52,
        caption: "The Interpolation Of Conscious Discord",
        colour: "Green",
        expanded: false,
        id: "1-3-52",
        level: 3,
        order: null,
        parent: "1-3"
      }
    ]
  }
 
]
return nodes
 }

 function nodes(){
   let nodes = 
   [{active: false, 
   briefId: 2,
   caption: "Sample Policy Two", 
   colour: "Green",
   expanded: false,
   id: 2, 
   order: 99,
   parent: null, 
   policy: null, 
   subpolicy: null}, 
   
   {active: false, 
   briefId: 1,
   caption: "Sample Policy",
   colour: "Crimson", 
   expanded: false, 
   id: 1,
   order: 999, 
   parent: null, 
   policy: null, 
   subpolicy: null}, 
   
   {active: false, 
   briefId: 2, 
   caption: "SubPolicy Two",
   colour: "Pink", 
   expanded: false,
   id: "1-2", 
   order: 0, 
   parent: "1", 
   policy: 1, 
   subpolicy: null}, 
   
   {active: false,
   briefId: 4, 
   caption: "SubPolicy Four",
   colour: "Silver",
   expanded: false, 
   id: "2-4",
   order: 9, 
   parent: "2", 
   policy: 2, 
   subpolicy: null}, 
   
   {active: false ,
   briefId: 3 ,
   caption: "SubPolicy Three", 
   colour: "Green" ,
   expanded: false,
   id: "1-3" ,
   order: 50 ,
   parent: "1" ,
   policy: 1, 
   subpolicy: null}, 
   
   {active: false,
   briefId: 1, 
   caption: "SubPolicy One",
   colour: "Crimson", 
   expanded: false, 
   id: "1-1", 
   order: 999, 
   parent: "1", 
   policy: 1,
   subpolicy: null}, 
   
   {active: false, 
   briefId: 6, 
   caption: "The Determinism Of Free-Floating Disposition",
   colour: "Crimson", 
   expanded: false, 
   id: "1-1-6", 
   order: null, 
   parent: "1-1", 
   policy: 1, 
   subpolicy: 1}, 
   {active: false, 
   briefId: 7, 
   caption: "The Analogy Of Cardinal Provenance", 
   colour: "Crimson", 
   expanded: false, 
   id: "1-1-7", 
   order: null, 
   parent: "1-1", 
   policy: 1, 
   subpolicy: 1} ]
   
 }