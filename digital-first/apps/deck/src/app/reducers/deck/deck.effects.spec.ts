import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 
 
import { async, TestBed, inject} from '@angular/core/testing'
import { Injector} from '@angular/core'
import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'
import { Store } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Observable, of } from 'rxjs'
import { skip, take } from 'rxjs/operators'
import { provideMockActions } from '@ngrx/effects/testing'
import { cold, hot } from 'jasmine-marbles'
import { DeckEffects } from './deck.effects'
import * as fromDeck from './deck.reducer'
import {
  DeckActionTypes,
  DeckActions,
  GetDeckItemsFailure,
  LoadDeck,
  GetDeckItems,
  AddDeckItem,
  RemoveDeckItem,
  UpdateDeckItem,
  GetBriefs,
  GetBriefsFailure,
  LoadBriefs
} from './deck.actions'
import { deckData, briefs } from '../../reducers/deck/local/data'
import { DeckDataLocalService } from '../deck/local/deck-data.service'
import { DeckDataService } from './deck-data.service'
import { CardType } from '../../components/deck'

const appDataServiceFactory = (
  
) => {
  let injector = Injector.create([{
    provide: DeckDataLocalService,
    deps: []
  }])
  
  return injector.get(DeckDataLocalService)
}


describe('DeckEffects', () => {
    let mockStore: MockStore<any>
    let actions$: Observable<any>
    let deckEffects: DeckEffects
    let service: DeckDataLocalService

    const initialState: fromDeck.State = {
      deckItems: [],
      briefs: [],
      selectedCard: null,
      currentParent: null
    }

    beforeEach(async(() => { 
      const configure: ConfigureFn = testBed => {
          TestBed.configureTestingModule({
    
       providers:
            [ 
              {
                provide: DeckDataService,
                useFactory: appDataServiceFactory,
                deps: []
              },
               /*  {
                  provide: DeckDataLocalService,
                  useValue: {getDeckItems: jest.fn()}
                }, */ 
                DeckEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState}),
            ],
          })
        }
         configureTests(configure).then(testBed => {
          mockStore = TestBed.get(Store)
          deckEffects = TestBed.get(DeckEffects)
          service = TestBed.get(DeckDataLocalService)
          let state = {...initialState, deckItems: deckData.data, briefs: briefs, currentParent: null, selectedCard: '7'}
  
          mockStore.setState(state) 
        })
    }))
  
  it('should be created', () => {
    expect(deckEffects).toBeTruthy()
  })

  it('should Load Deck Items', inject([DeckDataService], (service: DeckDataService)  => {
    const action = new GetDeckItems({parent: null})
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: {data: deckData.data, loading: false} });
    const expected = cold('--b', {b: new LoadDeck({data: deckData.data,loading: false})})
    service.getDeckItems = jest.fn(() => response)

    expect(deckEffects.getDeckItems$ ).toBeObservable(expected)
  }))

  it('should Load Briefs', inject([DeckDataService], (service: DeckDataService)  => {
    const action = new GetBriefs(null)
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: {data: briefs, loading: false} });
    const expected = cold('--b', {b: new LoadBriefs({data: briefs,loading: false})})
    service.getBriefs = jest.fn(() => response)

    expect(deckEffects.getBriefs$ ).toBeObservable(expected)
  }))

  it('should add Deck Item', inject([DeckDataService], (service: DeckDataService)  => {
    const pieChart = {
      chartData: [
        {
          data: [10, 20, 30]
        }
      ],
      chartLabels: ['Red', 'Yellow', 'Blue'],
      chartOptions: {
        responsive: true
      },
      chartLegend: true,
      chartType: 'pie'
    }
    const item = {
      id: '12',
      parent: '9',
      title: 'Pie Chart',
      supportingText: null,
      size: '4',
      cardType: CardType.Chart,
      actions: [],
      sortOrder: '1',
      colour: 'CornflowerBlue',
      titleClass: 'CornflowerBlue',
      media: null,
      data: {chartData: [
        {
          data: [10, 20, 30]
        }
      ]}
    }

   const retVal = {data:[item], loading: false}
    const action = new AddDeckItem(item)
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: {data: [item], loading: false} });
    const expected = cold('--b', {b: new LoadDeck(retVal)})
    service.addDeckItem = jest.fn(() => response)

    expect(deckEffects.addDeckItem$).toBeObservable(expected)
  }))

  it('should remove Deck Item', inject([DeckDataService], (service: DeckDataService)  => {
    const action = new RemoveDeckItem({id: '12'})
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: {data: deckData.data, loading: false} });
    const expected = cold('--b', {b: new LoadDeck({data: deckData.data,loading: false})})
    service.removeDeckItem = jest.fn(() => response)

    expect(deckEffects.removeDeckItem$ ).toBeObservable(expected)
  }))

  it('should update Deck Item', inject([DeckDataService], (service: DeckDataService)  => {
    const item = {
      id: '12',
      parent: '9',
      title: 'Pie Chart',
      supportingText: null,
      size: '4',
      cardType: CardType.Chart,
      actions: [],
      sortOrder: '1',
      colour: 'CornflowerBlue',
      titleClass: 'CornflowerBlue',
      media: null,
      data: {chartData: [
        {
          data: [10, 20, 30]
        }
      ]}
    }
    const action = new UpdateDeckItem(item)
    actions$ = hot('-a', { a: action} )
    const response = cold('-a|', { a: {data: [], loading: false} });
    const expected = cold('--b', {b: new GetDeckItems({ parent: null })})
    service.updateDeckItem = jest.fn(() => response)

    expect(deckEffects.updateDeckItem$ ).toBeObservable(expected)
  }))
})
