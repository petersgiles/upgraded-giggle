import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import { async, TestBed, inject} from '@angular/core/testing'
//import { ConfigureFn, configureTests } from '../../../lib/testing'
import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'
import { Store } from '@ngrx/store'
import { provideMockStore, MockStore, MockState } from '@ngrx/store/testing'
import { Observable, of } from 'rxjs'
import { skip, take } from 'rxjs/operators'
import { provideMockActions } from '@ngrx/effects/testing'
import { MapEffects } from './map.effects'
import { cold, hot } from 'jasmine-marbles'

import {
  MapActionTypes,
  MapActions,
  LoadMapPoints,
  GetMapPointsFailure,
  GetRefinedMapPoints
} from './map.actions'
import { MapPointsSearchGQL, BookType } from '../../generated/graphql'


import {
  ApolloTestingModule
} from 'apollo-angular/testing'

describe('MapEffects', () => {
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let mapEffects: MapEffects

  const initialState =   {
    app:{config: {webId: 'C9013762-2FED-49D7-8EA2-1DD650C7010E', siteId: '52233101-86F9-46D7-BBC0-22139AF854EE', header: {bookType: BookType.Red}},
    },
    refiner: {
      refinerGroups: [{children:[ {expanded: false,
        group: "commitmentTypes",
        id: 1,
        selected: false,
        title: "National"}],
      expanded: false,
      group: "commitmentTypes",
      id: undefined,
      selected: true,
      title: "National"}],
      expandedRefinerGroups: [],
      selectedRefiners: [{group: "commitmentTypes", id: 1}],
      textRefiner: null
    }
  } 

  beforeEach(async(() => { 
    const configure: ConfigureFn = testBed => {
        TestBed.configureTestingModule({
     imports: [ApolloTestingModule],
     providers:
          [ 
              MapEffects,
              provideMockActions(() => actions$),
              provideMockStore({ initialState}),
          ],
        })
      }
       configureTests(configure).then(testBed => {
        mockStore = TestBed.get(Store)
        mapEffects = TestBed.get(MapEffects)
      })
  }))


  it('should be created', () => {
    expect(MapEffects).toBeTruthy();
  })

   it('should set the initial state to a mocked one', () => {
  
    mockStore.setState(initialState);
    mockStore.pipe(take(1)).subscribe({
      next(val) {
        expect(val).toEqual(initialState);
      },
     
    });
  })
 
  it('should dispatch a StartAppInitialiser action in App-Init lifecycle', () => {
    const action = new GetRefinedMapPoints(null)
    mockStore.scannedActions$
      .pipe(skip(1))
      .subscribe(scannedAction => expect(scannedAction).toEqual(action));
    mockStore.dispatch(action);
  })
 
  it('should Load Map Points', inject([MapPointsSearchGQL],(getMapPointsGQL: MapPointsSearchGQL)  => {
    let result = {data: {mapPoints: getMapPoints()[0]}}

    const action = new GetRefinedMapPoints(null)
    actions$ = hot('-a', { a: action} );
    const expected = cold('-b', {b: new LoadMapPoints(result)})
    spyOn(getMapPointsGQL, 'fetch').and.returnValue(of(result))
    
    expect(mapEffects.getRefinedMapPoints$ ).toBeObservable(expected)
  }))

  it('should show error on error', inject([MapPointsSearchGQL],(getMapPointsGQL: MapPointsSearchGQL)  => {
    let result = {"errors":[{"message":"Variable '$refiner' is invalid. Unrecognized input fields 'test' for type 'CommitmentRefinerGraph'.","extensions":{"code":"INVALID_VALUE"}}]}
    let errorState =  {app:{config: {webId: 'C9013762-2FED-49D7-8EA2-1DD650C7010E', 
    siteId: '52233101-86F9-46D7-BBC0-22139AF854EE', 
    header: {bookType: BookType.Red, test: null}}
  }, refiner: {selectedRefiners: [{group: "commitmentTypes", id: 1}],
  textRefiner: null
}}
    const error = new Error('an error')
    const action = new GetRefinedMapPoints(null)
    actions$ = hot('-a', { a: action} );
    const response = cold('-#|', {}, error)
    spyOn(getMapPointsGQL, 'fetch').and.returnValue(response)
    const expected = cold('--b', {b: new  GetMapPointsFailure(error)})
    
    
    expect(mapEffects.getRefinedMapPoints$ ).toBeObservable(expected)
  }))
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
