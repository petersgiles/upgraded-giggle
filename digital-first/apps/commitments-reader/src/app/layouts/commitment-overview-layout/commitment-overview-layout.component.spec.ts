 import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import "zone.js/dist/proxy";
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 

import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AppRouterService } from '../../services/app-router.service'
import { CommitmentOverviewLayoutComponent } from './commitment-overview-layout.component'

import { ConfigureFn, configureTests } from '../../../lib/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { StoreModule, Store, createSelector, select, Action } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import * as fromRoot from '../../reducers'
import { Router, ActivatedRoute } from '@angular/router'
import { Observable, of } from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { Actions } from '@ngrx/effects'
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common'

describe('CommitmentLayoutComponent', () => {
  debugger
  let component: CommitmentOverviewLayoutComponent
  let fixture: ComponentFixture<CommitmentOverviewLayoutComponent>
  let mockStore: MockStore<fromRoot.State>
  let store: Store<fromRoot.State>
  let actions$: Observable<any>
  //let location: Location
  let initialState:  {
    router: {
      state: {
        url: Location,
        params: {},
        queryParams: {}
      }
     // navigationId: 0
    }
  }
  const stringSelector = 'config.siteId'


  /* const memoizedSelector = createSelector(
    () => initialState,
    state => state.config.siteId
  );
  const selectorWithPropMocked = createSelector(
    () => initialState,
    (state: typeof initialState, add: number) => state.config
  );

  const selectorWithProp = createSelector(
    () => initialState,
    (state: typeof initialState, add: number) => state.config
  ); */

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      declarations: [ CommitmentOverviewLayoutComponent ],
      providers:
      [
        Location,
        AppRouterService,
        StoreModule,
        Store,
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            pipe: jest.fn(),
           
          }
       },
       { provide: ActivatedRoute, useValue: { data: of({ name: 'pinocho' })}},
       { provide: Router },
          provideMockActions(() => actions$),
          provideMockStore({ initialState,
           selectors: [
          { selector: stringSelector, value: "1243242" },
          /*{ selector: memoizedSelector, value: "1243242" }*/],
      }),
      ]
    })
   }// .compileComponents()
   configureTests(configure).then(testBed => {
    fixture = testBed.createComponent(CommitmentOverviewLayoutComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store)
    fixture.detectChanges();
  })
  
  }))

 //https://github.com/thymikee/jest-preset-angular/blob/master/example/src/app/app.component.spec.ts
 //https://github.com/ngrx/platform/issues/835

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
