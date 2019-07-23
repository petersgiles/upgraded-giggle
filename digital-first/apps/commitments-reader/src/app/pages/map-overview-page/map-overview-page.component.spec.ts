import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import { ConfigureFn, configureTests } from '../../../lib/testing'

import { Store, createSelector, select } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Observable} from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { Router } from '@angular/router'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MapOverviewPageComponent } from './map-overview-page.component'
import * as fromMap from '../../reducers/map/map.reducer'
import {
  MdcElevationModule,
} from '@angular-mdc/web'

import { MapPoint } from '../../../../../../libs/df-map/src'

describe('MapOverviewPageComponent', () => {
  debugger
  let component: MapOverviewPageComponent;
  let fixture: ComponentFixture<MapOverviewPageComponent>;
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let router: Router
  let filteredMapPoints$: Observable<MapPoint[]>
  
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
      imports: [  MdcElevationModule],
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
           selectors: [
          { selector: selectRefinedMapPointsState, value: initialState.mapPoints },
        ],
      }),
      ]
    })
   }
   configureTests(configure).then(testBed => {
    mockStore = TestBed.get(Store)
    let state = {...initialState, mapPoints:getMapPoints()[0]}
    mockStore.setState(state)
    fixture = TestBed.createComponent(MapOverviewPageComponent);
    component = fixture.componentInstance
    router = testBed.get(Router)
    mockStore.overrideSelector(fromMap.selectRefinedMapPointsState, [state.mapPoints])
    fixture.detectChanges();
  })
  
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should return map points', () => {
    mockStore
     .select(fromMap.selectRefinedMapPointsState)
     .subscribe(mapPoints => {
       for(let mapPoint of mapPoints){
        expect(mapPoint.id).toBe(77)
       expect(mapPoint.title).toBe('Kalgoorlie - Boulder WA, Australia')
       expect(mapPoint.latitude).toBe(-30.749) 
       }
   })
 }) 
 
 it('should add map points to the behaviour Subject', () => {
   filteredMapPoints$ = mockStore.pipe(
    select(fromMap.selectRefinedMapPointsState))
    filteredMapPoints$.subscribe(result => {
      
      for(let mapPoint of result){
          expect(mapPoint.latitude).toBe(-30.749)
      }
    })
 })

  function getMapPoints(){
    const data = 
    [{id: 77, 
      placeId: "ChIJYQsiGslnTSoRzuH8N97a5mY", 
      title: "Kalgoorlie - Boulder WA, Australia", 
      latitude: -30.749, 
      longitude: 121.466,
      commitmentMapPoints:[{
      commitment:{commitmentType: {id: 1, title: 'National'}, 
      criticalDate:{id: 1, title: 'Budget'}, 
      id: 144, 
      portfolioLookup: {id: 9, title: 'Health'},
      portfolioLookupId: 9, 
      title: "20 New Medicare Subsidised MRI Licences"}
    }],
   }]
    return data
  }
})
