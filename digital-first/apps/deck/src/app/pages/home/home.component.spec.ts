import { RouterTestingModule } from '@angular/router/testing'
import { render } from '@testing-library/angular'
import { HomeComponent } from './home.component'
import { DigitalFirstDeckModule } from '../../components/deck'
import { ButtonModule, PanelModule } from '@df/components'
import { MdcDialogModule } from '@angular-mdc/web'
import { Store, StoreModule } from '@ngrx/store'
import { TestBed } from '@angular/core/testing'
import * as fromDeck from '../../reducers/deck/deck.reducer'
import { defaultCard } from '../../components/deck/deck/deck.component'
import { DeckActionTypes } from '../../reducers/deck/deck.actions'
import { deckData, briefs } from '../../reducers/deck/local/data'
import { CardType } from '../../components/deck/models/card-type-enum'
import { Router } from '@angular/router'

const initialState: fromDeck.State = fromDeck.initialState
let state = {
  ...initialState,
  deckItems: deckData.data,
  briefs: briefs,
  currentParent: defaultCard,
  selectedCard: defaultCard
}
test('can create a new card', async () => {
  const component = await render(HomeComponent, {
    imports: [
      PanelModule,
      ButtonModule,
      DigitalFirstDeckModule,
      MdcDialogModule,
      StoreModule.forRoot(fromDeck.reducer),
      StoreModule.forFeature('deck', fromDeck.reducer, {
        initialState: state
      }),
      RouterTestingModule.withRoutes([
        {
          path: '',
          component: HomeComponent
        }
      ])
    ]
  })

  // grab the store and spy on the dispatch method
  const store = TestBed.get(Store)

  store.dispatch = jest.fn()
  store.pipe = jest.fn()
  // find the create new card button and click it
  const createNewCardButton = component.getByText('Create New Card')

  component.click(createNewCardButton)

  // assert that an edit deck item action was dispatched with a payload of the default card
  expect(store.dispatch).toBeCalledWith({
    type: DeckActionTypes.EditDeckItem,
    payload: defaultCard
  })

  // set up the url to navigate to
  const router = TestBed.get(Router)
  router.navigate = jest.fn()
  const url = [
    'http://vm-dev-lbs13/sites/lbsMk1-pete/SitePages/admin.aspx/admin'
  ]
  // Expect the router to be called with the url
  const spy = jest.spyOn(router, 'navigate')

  // find the action button on the Standard Card
  const standardComponent = component.queryAllByText('DECK')
  component.click(standardComponent[0])

  expect(spy).toHaveBeenCalledWith(url)

  // Find the edit button and click it
  const editBtn = component.queryAllByText('edit')
  component.click(editBtn[0])

  // Expect the store to dispatch with payload of Default Card
  expect(store.dispatch).toBeCalledWith({
    type: DeckActionTypes.EditDeckItem,
    payload: defaultCard
  })
})
