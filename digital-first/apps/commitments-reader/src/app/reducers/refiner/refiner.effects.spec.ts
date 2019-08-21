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
import { Store} from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Observable, of } from 'rxjs'
import { skip, take } from 'rxjs/operators'
import { provideMockActions } from '@ngrx/effects/testing'
import { RefinerEffects } from './refiner.effects'


import { cold, hot } from 'jasmine-marbles'

import {

  GetRefinerGroups,
  LoadRefinerGroups
} from './refiner.actions'
import { GetRefinerTagsGQL, BookType } from '../../generated/graphql'


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
      electorates: getElectoratesLookups().data.electorates,
      states: getStatesLookups().data.states,
      criticalDates: getCriticalDates().data.criticalDates,
      deckItemBriefSummaries: [],
      portfolioLookups: getportfolioLookups().data.portfolioLookups
   },
    loading: false,
    networkStatus: 7,
    stale: false
  }

  let refiners = getRefiners()
  
    const action = new GetRefinerGroups(null)
    actions$ = hot('-a', { a: action} )
   
    const response = cold('-b|', {b: result})
   
    spyOn(getRefinerTags, 'fetch').and.returnValue(response)
    
    const expected = cold('--c', { c: new LoadRefinerGroups(refiners)})

    expect(refinerEffects.getRefinerGroups$ ).toBeObservable(expected)
  }))

  function getCommitmentTypes(){
    const data = {data: {commitmentTypes:[
      {id: 1, title: 'National'},
      {id: 2, title: 'State'},
      {id: 3, title: 'Electorate'},
      {id: 4, title: 'International'}
    ]}}
    return data
  }

  function getCriticalDates(){
    const data = {data: {criticalDates:[
      {id: 1, title: 'Budget'},
      {id: 2, title: 'First 100 days'},
    ]}}
    return data
  }

  function getportfolioLookups(){
    const data = {data: {portfolioLookups: [
        {id: 1, title: 'Agriculture and Water Resources'},
        {id: 2, title: "Attorney-General's"},
    ]}}
    return data
  }

  function getElectoratesLookups(){
    const data = {data: {electorates: [
        {id: 1, title: 'Adelaide'},
        {id: 2, title: 'Aston'},
    ]}}
    return data
  }

  function getStatesLookups(){
    const data = {data: {states: [
        {id: 1, title: 'SA'},
        {id: 2, title: 'VIC'},
    ]}}
    return data
  }

  function getRefiners(){
    const refiners =  [{children:[ 
      {
        cascadGroups: [],
        children: undefined,
        expanded: false,
        group: 'commitmentTypes',
        groupBy: '',
        id: 1,
        selected: false,
        singleSelection: true,
        title: 'National'},
      {
        cascadGroups: ['states'],
        children: undefined,
        expanded: false,
        group: 'commitmentTypes',
        groupBy: '',
        id: 2,
        selected: false,
        singleSelection: true,
        title: 'State'
    },
    {
      cascadGroups: ['electorates'],
      children: undefined,
      expanded: false,
      group: 'commitmentTypes',
      groupBy: '',
      id: 3,
      selected: false,
      singleSelection: true,
      title: 'Electorate'
  },
  {
    cascadGroups: [],
    children: undefined,
    expanded: false,
    group: 'commitmentTypes',
    groupBy: '',
    id: 4,
    selected: false,
    singleSelection: true,
    title: 'International'
}],
  enableSlide: undefined,
  expanded: false,
  group: 'commitmentTypes',
  id: undefined,
  selected: false,
  title: 'Commitment Types'
  },
  {
    children: [{
      cascadGroups: [],
      children: undefined,
      expanded: false,
      group: 'electorates',
      groupBy: undefined,
      id: 1,
      selected: false, 
      singleSelection: undefined,
      title: 'Adelaide'
    },
      {
        cascadGroups: [],
        children: undefined,
        expanded: false,
        group: 'electorates',
        groupBy: undefined,
        id: 2,
        selected: false, 
        singleSelection: undefined,
        title: 'Aston'}],
    enableSlide: true,
    expanded: false,
    group: 'electorates',
    id: undefined,
    selected: false,
    title: 'Electorates'
  },
  {
    children: [{
      cascadGroups: [],
      children: undefined,
      expanded: false,
      group: 'states',
      groupBy: '',
      id: 1,
      selected: false,
      singleSelection: undefined,
       title: 'SA'}, 
    {
      cascadGroups: [],
      children: undefined,
      expanded: false,
      group: 'states',
      groupBy: '',
      id: 2,
      selected: false,
      singleSelection: undefined, 
      title: 'VIC'}],
    enableSlide: undefined,
    expanded: false,
    group: 'states',
    id: undefined,
    selected: false,
    title: 'States'
  },
  {children:[
    {
      cascadGroups: [],
      children: undefined,
      expanded: false,
      group: 'criticalDates',
      groupBy: '',
      id: 1,
      selected: false,
      singleSelection: undefined, 
      title: 'Budget'},
    {
      cascadGroups: [],
      children: undefined,
      expanded: false,
      group: 'criticalDates',
      groupBy: '',
      id: 2,
      selected: false,
      singleSelection: undefined, 
      title: 'First 100 days'
    }],
      enableSlide: undefined,
      expanded: false,
      group: 'criticalDates',
      id: undefined,
      selected: false,
      title: 'Critical Date'},
      {children:[
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'portfolioLookups',
          groupBy: '',
          id: 1,
          selected: false,
          singleSelection: undefined, 
          title: 'Agriculture and Water Resources'},
        {
          cascadGroups: [],
          children: undefined,
          expanded: false,
          group: 'portfolioLookups',
          groupBy: '',
          id: 2,
          selected: false,
          singleSelection: undefined, 
          title: "Attorney-General's"
        }],
        enableSlide: undefined, 
        expanded: false,
        group: 'portfolioLookups',
        id: undefined,
        selected: false,
        title: 'Portfolios'
      },
      {
        children: [],
        enableSlide: undefined, 
        expanded: false,
        group: 'deckItemBriefSummaries',
        id: undefined,
        selected: false,
        title: 'Theme'
      }
     
    ]
    return refiners
  }

})
