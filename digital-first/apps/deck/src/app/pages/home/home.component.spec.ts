import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'jest-zone-patch' 


import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'
import { ConfigureFn, configureTests } from '../../../../../../libs/df-testing'
import { Router, ActivatedRoute,  ParamMap,  convertToParamMap } from '@angular/router'
import { Store, createSelector, select } from '@ngrx/store'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Observable, of, BehaviorSubject} from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { HomeComponent } from './home.component'
import * as fromDeck from '../../reducers/deck/deck.reducer'
import {
  SetActiveParent,
  GoBack,
  GetDeckItems,
  EditDeckItem,
  UpdateDeckItem,
  SetSelectedDeckItem,
  GetBriefs,
  AddDeckItem
} from '../../reducers/deck/deck.actions'
import { CardType, DeckItem } from '../../components/deck'
import { deckData, briefs } from '../../reducers/deck/local/data'
import { FormBuilder } from '@angular/forms';
import { MdcDialog, Overlay } from '@angular-mdc/web'




describe('HomeComponent', () => {
  debugger
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let router: Router
  let mockStore: MockStore<any>
  let actions$: Observable<any>
  let parent$: Observable<any>
  let selectedCard: DeckItem
  let cardTypes$: BehaviorSubject<string[]> = new BehaviorSubject(
    Object.keys(CardType).map(ct => CardType[ct] as string)
  )
  let grandParent$: Observable<DeckItem>
  let eligibleParents$: Observable<{ id: string; title: string }[]>
  let deckItems$: Observable<DeckItem[]>
  let briefs$: Observable<{ id: string; name: string }[]>

  let selected$: Observable<any>
  let parentDeckItem$: any

  const initialState: fromDeck.State = {
    deckItems: [],
    briefs: [],
    selectedCard: null,
    currentParent: null
  }

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{
          path: '/',
          component: HomeComponent
        }])],
      providers: [ 
        MdcDialog,
        Overlay,
        FormBuilder,
      {
        provide: Router,
        useValue: {get: jest.fn()}
      },
      { provide: Store,
        useValue: {
          pipe: jest.fn()
        }
       },
       { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ parent: '' }))}},
       provideMockActions(() => actions$),
       provideMockStore({ initialState,
   }),
     ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent]
    })
  }
  configureTests(configure).then(testBed => {
   fixture = TestBed.createComponent(HomeComponent)
   component = fixture.componentInstance;
   router = TestBed.get(Router)
   

   mockStore = TestBed.get(Store)
   let state = {...initialState, deckItems: deckData.data, briefs: briefs, currentParent: null, selectedCard: '7'}
  
   mockStore.setState(state) 
  
   mockStore.overrideSelector(fromDeck.selectCurrentParentState, state.currentParent)
   mockStore.overrideSelector(fromDeck.selectDeckItemsState, state.deckItems)
   mockStore.overrideSelector(fromDeck.selectSelectedCardState, state.selectedCard)
   mockStore.overrideSelector(fromDeck.selectCurrentBriefsState, state.briefs)
   //router.initialNavigation() 
   fixture.detectChanges();
 })
 
}))

  

   it('should create', () => {
    expect(component).toBeTruthy()
  }) 

  it('should return deck items from selector', () => {
    mockStore
     .select(fromDeck.selectCardsByParentState)
     .subscribe(deckItems => {
          expect(deckItems[0].title).toBe('SummaryLinksNoActions')
       }
    )})

    it('observable should return deck items', () => {
      deckItems$ = mockStore.pipe(
        select(fromDeck.selectCardsByParentState))
        deckItems$.subscribe(result => {
              expect(result[0].title).toBe('SummaryLinksNoActions')
          }
        )
     })

     it('should return card parent from selector', () => {
      mockStore
       .select(fromDeck.selectCurrentParentState)
       .subscribe(parent => {
           expect(parent).toBeNull()
         }
      )})

        it('should return eligible parent from selector', () => {
          mockStore
           .select(fromDeck.selectEligibleParentsState)
           .subscribe((parents: []) => {
               expect(parents.length).toBe(2)
             }
          )})
       
          it('observable should return deck items', () => {
            eligibleParents$ = mockStore.pipe(
              select(fromDeck.selectEligibleParentsState))
              eligibleParents$.subscribe((parents: []) => {
                expect(parents.length).toBe(2)
                }
              )
           })

           it('should return selected card from selector', () => {
            mockStore
             .select(fromDeck.selectSelectedCardState)
             .subscribe(card => {
                 expect(card).toBe('7')
               }
            )})

            it('observable should return parents', () => {
              let cards = [{actions: [{title: 'Get Started', url: '/dashboard'}], cardType: 'Parent',
               colour: 'IGBGreen', data: false, id: '2', media: null, parent: null, size: '4', sortOrder:
              '9', supportingText: '<div class=\'ExternalClassEC844ABB266C4CF7857F776E0B745CCF\'><p>test </p></div>', title: 'Test', titleClass: 'IGBGreen'}, 
              {actions: [{title: 'Go', url: 'https://www.chartjs.org'}], cardType: 'Parent',
              colour: 'Crimson', data: null, id: '9', media: null, parent: null, size: '4', sortOrder: '1',
               supportingText: '<div><img src=\'https://www.chartjs.org/img/chartjs-logo.svg\'></div>', title: 'Chart Cards', titleClass: 'Crimson'}]
              selected$ = mockStore.pipe(
                select(fromDeck.selectEligibleParentsState))
                selected$.subscribe(cards => {
                  expect(cards[0].id).toBe('2')
                  expect(cards[0].actions[0].title).toBe('Get Started')
                  }
                )
             })
             it('should return briefs from selector', () => {
              mockStore
               .select(fromDeck.selectCurrentBriefsState)
               .subscribe((briefs: []) => {
                   expect(briefs.length).toBe(5)
                 }
              )})
  
              it('observable should return briefs', () => {
                briefs$ = mockStore.pipe(
                  select(fromDeck.selectCurrentBriefsState))
                  briefs$.subscribe((briefs: []) => {
                    expect(briefs.length).toBe(5)
                  }
                  )
               })
})
