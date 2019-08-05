import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 

import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { OverviewPageComponent } from './overview-page.component'
import { Store, createSelector, select } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Observable} from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { Router } from '@angular/router'
import * as fromOverview from '../../reducers/overview/overview.reducer'

describe('OverviewPageComponent', () => {
  let component: OverviewPageComponent;
  let fixture: ComponentFixture<OverviewPageComponent>;
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let router: Router
 
  const initialState: fromOverview.State = {
    commitments: [],
    columns: [
      { prop: 'title', name: 'Title' },
      { prop: 'portfolio', name: 'Responsible Portfolio' },
      { prop: 'criticalDate', name: 'Critical Date' }
    ],
    error: {}
  }

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OverviewPageComponent],
      providers:
      [
        { provide: Store,
           useValue: {
             pipe: jest.fn()
           }
          },
        {
          provide: Router,
          useValue: {navigate: jest.fn()}
        }, 
          provideMockActions(() => actions$),
          provideMockStore({ initialState,
      }),
      ]
    })
   }
   configureTests(configure).then(testBed => {
    fixture = TestBed.createComponent(OverviewPageComponent);
    component = fixture.componentInstance
    mockStore = testBed.get(Store)
    router = testBed.get(Router)
    let state = {...initialState, commitments:getCommitments()}
    mockStore.overrideSelector(fromOverview.selectRefinedCommitmentsColumnsState, initialState.columns)
    mockStore.overrideSelector(fromOverview.selectFilteredCommitmentsState, state.commitments)
    fixture.detectChanges();
  })
  
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should return columns', () => {
    mockStore
     .select(fromOverview.selectRefinedCommitmentsColumnsState)
     .subscribe(columns => {
     expect(columns[0].prop).toBe('title')
       }
   )
 }) 

 it('should return columns', () => {
  mockStore
   .select(fromOverview.selectFilteredCommitmentsState)
   .subscribe(commitments => {
    expect(commitments[0].title).toBe('ARIA Music Teacher Award')
     }
 )
}) 

 })
 function getCommitments(){
  const data = [{id: 10, title: "ARIA Music Teacher Award",bookType: "Red", 
  politicalParty: "Australian Labor Party", announcedBy: null, displayOrder: undefined, portfolio: "Communications and the Arts", commitmentType: 'International', criticalDate: undefined}]

  return data
}