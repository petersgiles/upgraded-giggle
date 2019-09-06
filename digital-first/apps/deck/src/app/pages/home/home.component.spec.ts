import { RouterTestingModule } from '@angular/router/testing'
import { render } from '@testing-library/angular'
import { HomeComponent } from './home.component'
import { DigitalFirstDeckModule } from '../../components/deck'
import { ButtonModule, PanelModule } from '@df/components'
import { provideMockStore } from '@ngrx/store/testing'
import { MdcDialogModule } from '@angular-mdc/web'
import { Store } from '@ngrx/store'
import { TestBed } from '@angular/core/testing'
import * as fromDeck from '../../reducers/deck/deck.reducer'
import { defaultCard } from '../../components/deck/deck/deck.component'
import { DeckActionTypes } from '../../reducers/deck/deck.actions'

test('can create a new card', async () => {
  const component = await render(HomeComponent, {
    imports: [
      RouterTestingModule,
      PanelModule,
      ButtonModule,
      DigitalFirstDeckModule,
      MdcDialogModule
    ],
    providers: [provideMockStore<fromDeck.State>()]
  })

  // grab the store and spy on the dispatch method
  const store = TestBed.get(Store)

  store.dispatch = jest.fn()

  // find the create new card button and click it
  const createNewCardButton = component.getByText('Create New Card')

  component.click(createNewCardButton)

  // assert that an edit deck item action was dispatched with a payload of the default card
  expect(store.dispatch).toBeCalledWith({
    type: DeckActionTypes.EditDeckItem,
    payload: defaultCard
  })
})
