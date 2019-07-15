import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import { async, ComponentFixture, TestBed, inject} from '@angular/core/testing'
import { ConfigureFn, configureTests } from '../../../lib/testing'
import { Store, StoreModule, combineReducers } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Observable, of } from 'rxjs'
import { skip, take } from 'rxjs/operators'
import { provideMockActions } from '@ngrx/effects/testing'
import { RefinerEffects } from './refiner.effects'

import { Config } from   '../../../../../../libs/df-app-core/src/lib/services/config/config-model'
import { AppState,  AppReducer } from '../../../../../../libs/df-app-core/src/'
import { cold, hot } from 'jasmine-marbles'

import {
  RefinerActionTypes,
  RefinerActions,
  GetRefinersFailure,
  GetRefinerGroups,
  LoadRefinerGroups
} from './refiner.actions'
import { GetRefinerTagsGQL, BookType } from '../../generated/graphql'
import { CRMenu } from './refiner.models'
import { buildRefiner } from './refiner-utils'

import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing'

describe('RefinerEffects', () => {
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let refinerEffects: RefinerEffects
  let backend: ApolloTestingController

  const initialState =   {
    app:{config: {webId: 'C9013762-2FED-49D7-8EA2-1DD650C7010E', siteId: '52233101-86F9-46D7-BBC0-22139AF854EE', header: {bookType: BookType.Red}}},
  } 

  beforeEach(async(() => { 
    const configure: ConfigureFn = testBed => {
        TestBed.configureTestingModule({
     imports: [ApolloTestingModule],
     providers:
          [ 
              RefinerEffects,
              provideMockActions(() => actions$),
              provideMockStore({ initialState}),
          ],
        })
      }
       configureTests(configure).then(testBed => {
        mockStore = TestBed.get(Store)
        refinerEffects = TestBed.get(RefinerEffects)
        backend = TestBed.get(ApolloTestingController)
      })
  }))

  afterEach(() => {
   // backend.verify() //ensure there are no open operations
  })

  it('should be created', () => {
    expect(refinerEffects).toBeTruthy();
  })

  it('should set the initial state to a mocked one', () => {
  
    mockStore.setState(initialState);
    mockStore.pipe(take(1)).subscribe({
      next(val) {
        expect(val).toEqual(initialState);
      },
     
    });
  })

  it('should dispatch a GetRefinerGroups action', () => {
    const action = new GetRefinerGroups(null)
    mockStore.scannedActions$
      .pipe(skip(1))
      .subscribe(scannedAction => expect(scannedAction).toEqual(action));
    mockStore.dispatch(action);
  })

  it('should start app init', inject([GetRefinerTagsGQL],(getRefinerTags: GetRefinerTagsGQL)  => {
    let result = {data: {commitmentTypes: getCommitmentTypes().data.commitmentTypes, 
    criticalDates: getCriticalDates().data.criticalDates,
    deckItemBriefSummaries: [],
    portfolioLookups: getportfolioLookups().data.portfolioLookups},
    loading: false,
    networkStatus: 7,
    stale: false
  }

  let refiners =  [{children:[ 
      {expanded: false,
        group: "commitmentTypes",
        id: 1,
        selected: false,
        title: "National"},
      {
        expanded: false,
        group: "commitmentTypes",
        id: 2,
        selected: false,
        title: "State"
    },
    {
      expanded: false,
      group: "commitmentTypes",
      id: 2,
      selected: false,
      title: "Electorate"
  },
  {
    expanded: false,
    group: "commitmentTypes",
    id: 2,
    selected: false,
    title: "International"
}]
  },
  {children:[
    {expanded: false,
      group: "criticalDates",
      id: 1,
      selected: false,
      title: "Budget"},
    {
      expanded: false,
      group: "criticalDates",
      id: 2,
      selected: false,
      title: "First 100 day"
    }
      ]},
      {children:[
        {expanded: false,
          group: "portfolioLookups",
          id: 1,
          selected: false,
          title: "Agriculture and Water Resources"},
        {
          expanded: false,
          group: "portfolioLookups",
          id: 2,
          selected: false,
          title: "Attorney-General's"
        }
          ]}
    ]
    
  

    const action = new GetRefinerGroups(null)
    actions$ = hot('-a', { a: action} );
    const expected = cold('--b', {b: new LoadRefinerGroups(of(refiners))})
    spyOn(getRefinerTags, 'fetch').and.returnValue(of(result))
    
    expect(refinerEffects.getRefinerGroups$ ).toBeObservable(expected)
  }))

  function getCommitmentTypes(){
    const data = {data: {commitmentTypes:[
      {id: 1, title: "National"},
      {id: 2, title: "State"},
      {id: 3, title: "Electorate"},
      {id: 4, title: "International"}
    ]}}
    return data
  }

  function getCriticalDates(){
    const data = {data: {criticalDates:[
      {id: 1, title: "Budget"},
      {id: 2, title: "First 100 days"},
     /*  {id: 3, title: "First term"},
      {id: 4, title: "First year"},
      {id: 5, title: "Undefined"},
      {id: 6, title: "First two weeks"},
      {id: 7, title: "dave test "} */
    ]}}
    return data
  }

  function getportfolioLookups(){
    const data = {data: {portfolioLookups: [
        {id: 1, title: "Agriculture and Water Resources"},
        {id: 2, title: "Attorney-General's"},
       /*  {id: 3, title: "Communications and the Arts"},
        {id: 4, title: "Defence"} */
    ]}}
    return data
  }

})
