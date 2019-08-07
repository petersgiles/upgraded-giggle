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

describe('BriefLayoutComponent when third level selection', () => {
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
    let state = {...initialState, navigationNodes: nodes(), activeBriefId: '31', expandedNodes: [1, '1-31']}
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
      expect(nodes.length).toEqual(7)
   })
 }) 

 it('should return navigation nodes', () => {
  mockStore
   .select(fromNavigation.selectExpandedNodesState)
   .subscribe(nodes => {
     expect(nodes[0]).toBe('1-3-31')
 })
}) 

it('should return navigation nodes', () => {
  mockStore
   .select(fromNavigation.selectNavigationNodeTreeState)
   .subscribe(nodes => {
     expect(nodes[0].briefId).toBe(1)
     expect(nodes[0].id).toBe(1)
     expect(nodes[0].children[0].briefId).toBe(2)
     expect(nodes[0].children[0].id).toBe('1-2')
     expect(nodes[0].children[0].parent).toBe('1')
     expect(nodes[0].children[1].briefId).toBe(3)
     expect(nodes[0].children[1].id).toBe('1-3')
     expect(nodes[0].children[1].parent).toBe('1')
     expect(nodes[0].children[1].children[0].briefId).toBe(31)
     expect(nodes[0].children[1].children[0].id).toBe('1-3-31')
     expect(nodes[0].children[1].children[0].parent).toBe('1-3')
 })
}) 

 })

 describe('BriefLayoutComponent when level 2', () => {
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
    let state = {...initialState, navigationNodes: nodes(), activeBriefId: '1', expandedNodes: [1, '1-31']}
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
   .select(fromNavigation.selectExpandedNodesState)
   .subscribe(nodes => {
     let x = nodes
     expect(nodes).toEqual([]) //Don't use tobe as the arrays will be different
 })
}) 

it('should return navigation nodes', () => {
  mockStore
   .select(fromNavigation.selectNavigationNodeTreeState)
   .subscribe(nodes => {
     let x = nodes
    expect(nodes[0].briefId).toBe(1)
     expect(nodes[0].id).toBe(1)
     expect(nodes[0].children[0].briefId).toBe(2)
     expect(nodes[0].children[0].id).toBe('1-2')
     expect(nodes[0].children[0].parent).toBe('1')
     expect(nodes[0].children[1].briefId).toBe(3)
     expect(nodes[0].children[1].id).toBe('1-3')
     expect(nodes[0].children[1].parent).toBe('1')
 })
})

 })

 describe('BriefLayoutComponent when top level', () => {
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
    let state = {...initialState, navigationNodes: nodes(), activeBriefId: '1', expandedNodes: []}
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
   .select(fromNavigation.selectExpandedNodesState)
   .subscribe(nodes => {
     let x = nodes
     expect(nodes).toEqual([]) //Don't use tobe as the arrays will be different
 })
}) 

it('should return navigation nodes', () => {
  mockStore
   .select(fromNavigation.selectNavigationNodeTreeState)
   .subscribe(nodes => {
     let x = nodes
    expect(nodes[0].briefId).toBe(1)
     expect(nodes[0].id).toBe(1)
     expect(nodes[0].children[0].briefId).toBe(2)
     expect(nodes[0].children[0].id).toBe('1-2')
     expect(nodes[0].children[0].parent).toBe('1')
     expect(nodes[0].children[1].briefId).toBe(3)
     expect(nodes[0].children[1].id).toBe('1-3')
     expect(nodes[0].children[1].parent).toBe('1')
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
  children: [{active: false, briefId: 2,caption: "SubPolicy Two",colour: "Pink",
  expanded: false,
  id: "1-2",
  level: 2,
  order: 0,
  parent: "1",
  policy: 1,
  subpolicy: null,
  },
  {
      active: false, briefId: 3,caption: "SubPolicy Three",
      children: [{active: false,
      briefId: 31,
      caption: "The Projection Of Intuitive Integration",
      colour: "Green",
      expanded: true,
      id: "1-3-31",
      level: 3,
      order: null,
      parent: "1-3",
      policy: 1,
      subpolicy: 3}],
    colour: "Green",
    expanded: false,
    id: "1-3",
    level: 2,
    order: 50,
    parent: "1",
    policy: 1,
    subpolicy: null}] },
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
    briefId: 2,
    caption: "Sample Policy Two",
    colour: "Green",
    expanded: false,
    id: 2,
    level: 1,
    order: 99,
    parent: null,
    policy: null,
    subpolicy: null,
    children: [
      {
        active: false,
        briefId: 4,
        caption: "SubPolicy Four",
        childre: [{
          active: false,
          briefId: 319,
          caption: "Test Title 3",
          colour: "Silver",
          expanded: false,
          id: "2-4-319",
          level: 3,
          order: 999,
          parent: "2-4",
          policy: 2,
          subpolicy: 4,
        }],
        colour: "Silver",
        expanded: false,
        id: "2-4",
        level: 2,
        order: 9,
        parent: "2",
        policy: 2,
        subpolicy: null
      }
    ]
  }
 
]
return nodes
 }
//expandedNode = [2], briefid = 319, id= 2-4-319
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
   {
    active: false,
    briefId: 31,
    caption: "The Projection Of Intuitive Integration",
    colour: "Green",
    expanded: false,
    id: "1-3-31",
    order: null,
    parent: "1-3",
    policy: 1,
    subpolicy: 3
   },
   {
     active: false,
    briefId: 319,
    caption: "Test Title 3",
    colour: "Silver",
    expanded: false,
    id: "2-4-319",
    order: 999,
    parent: "2-4",
    policy: 2,
    subpolicy: 4
  }
   ]

   return nodes
   
 }