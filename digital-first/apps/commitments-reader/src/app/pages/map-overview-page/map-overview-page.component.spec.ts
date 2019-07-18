import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import { ConfigureFn, configureTests } from '../../../lib/testing'

import { Store, createSelector } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Observable, of } from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'

import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MapOverviewPageComponent } from './map-overview-page.component'
import * as fromMap from '../../reducers/map/map.reducer'
import {
  MdcElevationModule,
} from '@angular-mdc/web'
import { Router} from '@angular/router'
import { DfMapModule } from '../../../../../../libs/df-map/src'
import { MapPoint } from '../../../../../../libs/df-map/src'

describe('MapOverviewPageComponent', () => {
  debugger
  let component: MapOverviewPageComponent;
  let fixture: ComponentFixture<MapOverviewPageComponent>;
  let mockStore: MockStore<fromMap.State>
  let actions$: Observable<any>
 
  const initialState: fromMap.State = {
    mapPoints: []
  }

  const  selectRefinedMapPointsState = createSelector(
    () => initialState,
    (state: typeof initialState) => state.mapPoints
  )

 
  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      declarations: [ MapOverviewPageComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MdcElevationModule, DfMapModule],
      providers:
      [
          provideMockActions(() => actions$),
          provideMockStore({ initialState,
           selectors: [
          { selector: selectRefinedMapPointsState, value: initialState.mapPoints },
        ],
      }),
      ]
    })
   }
   configureTests(configure).then(testBed => {
    mockStore = TestBed.get(Store)
    fixture = TestBed.createComponent(MapOverviewPageComponent);
    component = fixture.componentInstance

    mockStore.overrideSelector(fromMap.selectRefinedMapPointsState, initialState.mapPoints)
    
    fixture.detectChanges();
  })
  
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
