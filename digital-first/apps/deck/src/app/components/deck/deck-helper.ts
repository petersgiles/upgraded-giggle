import { DeckItem } from './models/deck-item-model'

export class DeckHelper {
  public static lookForAllDescendants(
    parent: DeckItem,
    cards: DeckItem[],
    descendants: DeckItem[]
  ) {
    const children = cards.filter(c => c.parent === parent.id)
    if (children.length > 0) {
      children.forEach(c => {
        descendants.push(c)
        this.lookForAllDescendants(c, cards, descendants)
      })
    }
  }

  public static isSelectedParentACurrentDescendant(
    parent: DeckItem,
    cards: DeckItem[]
  ) {
    const descendants: DeckItem[] = []
    this.lookForAllDescendants(parent, cards, descendants)
    return descendants.find(d => d.parent === parent.id)
  }

  public static liftUpChildren(parent: DeckItem, cards: DeckItem[]) {
    cards
      .filter(c => c.parent === parent.id)
      .forEach(c => {
        c.parent = parent.parent
      })
  }
}
