import { render } from '@testing-library/angular'
import { DeckComponent } from './deck.component'
import { CardType, DigitalFirstDeckModule } from '..'
import { deckData } from '../../../reducers/deck/local/data'
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms'

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

test('should emit onSubmitted when saving edited card', async () => {
  const onSubmitted = jest.fn()
  const component = await render(DeckComponent, {
    componentProperties: {
      cards: [standardCard],
      readOnly: true,
      selected: standardCard,
      onSubmitted: {
        emit: onSubmitted
      } as any
    },
    imports: [DigitalFirstDeckModule],
    excludeComponentDeclaration: true
  })

  const cardForm = {
    id: standardCard.id,
    title: standardCard.title,
    parent: standardCard.parent,
    supportingText: standardCard.supportingText,
    size: standardCard.size,
    cardType: standardCard.cardType,
    sortOrder: standardCard.sortOrder,
    colour: standardCard.colour,
    titleClass: standardCard.titleClass,
    media: {
      id: '',
      type: '',
      url: ''
    },
    actions: standardCard.actions,
    data: standardCard.data,
    selectedBriefs: null
  }

  const saveButton = component.getByText('Save')
  saveButton.click()

  expect(onSubmitted).toHaveBeenCalledTimes(1)
  expect(onSubmitted).toHaveBeenCalledWith(cardForm)
})

test('should show Add Acction button when editing a card', async () => {
  const component = await render(DeckComponent, {
    componentProperties: {
      cards: [standardCard],
      readOnly: true,
      selected: standardCard
    },
    imports: [DigitalFirstDeckModule],
    excludeComponentDeclaration: true
  })

  const addActionButton = component.getByText('Add Action')

  expect(addActionButton).toBeTruthy()
})
