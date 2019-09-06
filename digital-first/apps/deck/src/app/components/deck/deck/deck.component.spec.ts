import { render } from '@testing-library/angular'
import { DeckComponent } from './deck.component'
import { CardType, DigitalFirstDeckModule } from '..'
import { deckData } from '../../../reducers/deck/local/data'

const standardCard = deckData.data.filter(
  value => value.cardType === CardType.Standard
)[0]

const allCards = deckData.data.filter(
  card => card.cardType !== CardType.Chart // TODO: seems to be a problem with chart type?
)

test('can display a standard card', async () => {
  const component = await render(DeckComponent, {
    componentProperties: { cards: [standardCard] },
    imports: [DigitalFirstDeckModule],
    excludeComponentDeclaration: true
  })

  expect(component.getByText(standardCard.title)).toBeTruthy()
})

test('can display all card types', async () => {
  const component = await render(DeckComponent, {
    componentProperties: {
      cards: allCards
    },
    imports: [DigitalFirstDeckModule],
    excludeComponentDeclaration: true
  })

  // assert that all the cards have been created by find them by their title
  allCards.forEach(card => {
    expect(component.getByText(card.title)).toBeTruthy()
  })
})

test('should not display new card feature when deck is read only', async () => {
  const component = await render(DeckComponent, {
    componentProperties: {
      cards: [standardCard],
      readOnly: true
    },
    imports: [DigitalFirstDeckModule],
    excludeComponentDeclaration: true
  })

  const createNewCardButton = component.queryByText('Create New Card')

  expect(createNewCardButton).toBeNull()
})
