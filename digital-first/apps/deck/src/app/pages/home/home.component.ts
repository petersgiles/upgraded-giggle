import { Component, OnInit, OnDestroy, Injectable } from '@angular/core'
import {
  DeckItem,
  DeckHelper,
  CardType,
  DialogAreYouSureComponent
} from '@df/components'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { map, first, tap, withLatestFrom } from 'rxjs/operators'
import { Observable, BehaviorSubject, combineLatest } from 'rxjs'
import { GetDeckItemsGQL } from '../../generated/deck-schema'
import { MdcDialog } from '@angular-mdc/web'

@Component({
  selector: 'digital-first-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private dialog: MdcDialog,
    private getDeckItems: GetDeckItemsGQL
  ) {}

  public cards$: BehaviorSubject<DeckItem[]> = new BehaviorSubject([])
  public parent$: BehaviorSubject<string> = new BehaviorSubject(null)
  public selectedCard$: BehaviorSubject<DeckItem> = new BehaviorSubject(null)
  public cardTypes$: BehaviorSubject<string[]> = new BehaviorSubject(
    Object.keys(CardType).map(ct => CardType[ct] as string)
  )
  public grandParent$: Observable<DeckItem>
  public displayCards$: Observable<DeckItem[]>
  public eligibleParents$: Observable<{ id: string; title: string }[]>

  ngOnInit() {
    this.getDeckItems
      .fetch({ id: null }, { fetchPolicy: 'network-only' })
      .pipe(
        // tslint:disable-next-line:no-console
        tap((result: any) => console.log(result.data.deckItems))
      )
      .subscribe((result: any) => {
        console.log(result.data.deckItems)
      })

    this.cards$.next([])
    this.setUpDisplayCards()
    this.setUpEligibleParents()
    this.setUpGrandParent()
    this.route.paramMap
      .pipe(
        first(),
        map((params: ParamMap) => +params.get('parent'))
      )
      .subscribe((parent: any) => this.parent$.next(parent))
  }
  ngOnDestroy(): void {}

  handleSubmitted($event: DeckItem) {
    // TODO: the following code didn't save anything jsut for demo
    const oldCards = this.cards$.getValue()
    const newCards = oldCards.filter(p => $event.id !== p.id)
    const oldCard = oldCards.find(p => p.id === $event.id)
    if (oldCard && $event.parent !== oldCard.parent) {
      const cards = this.cards$.getValue()
      if (DeckHelper.isSelectedParentACurrentDescendant($event, cards)) {
        DeckHelper.liftUpChildren(oldCard, cards)
      }
    }
    if (!$event.id) {
      $event.id = Math.random().toString()
    }
    newCards.push($event)
    this.cards$.next(newCards)
    this.selectedCard$.next(null)
    $event = null
  }

  handleCancel($event) {
    if (!$event.id) {
      const cardItems = this.cards$.getValue().filter(item => item.id)
      this.cards$.next(cardItems)
    }
    this.selectedCard$.next(null)
  }

  handleAction($event) {
    console.log($event)
    const cardType = CardType
    if ($event.cardType === cardType.Parent || $event.hasChildren) {
      this.parent$.next($event.id)
    } else {
    }
  }

  handleEdit($event) {
    this.selectedCard$.next($event)
  }

  handleGoBack($event) {
    if (this.selectedCard$.getValue()) {
      const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
        data: `It looks like you have been editing a card: ${
          this.selectedCard$.getValue().title
        } . If you leave before saving, your changes will be lost.`
      })
      dialogRef
        .afterClosed()
        .pipe(first())
        .subscribe(result => {
          if (result === 'accept') {
            this.resetParent($event)
            this.selectedCard$.next(null)
          }
        })
    } else {
      this.resetParent($event)
    }
  }

  private resetParent($event: DeckItem) {
    this.parent$.next($event.parent)
  }

  private setUpDisplayCards() {
    this.displayCards$ = combineLatest(this.parent$, this.cards$).pipe(
      map(([parentId, cards]) => {
        const value = cards
          .filter(c => c.parent === parentId)
          .sort((a, b) => (Number(a.sortOrder) < Number(b.sortOrder) ? -1 : 1))
        value.forEach(c => {
          c.hasChildren = cards.filter(x => x.parent === c.id).length > 0
        })
        return value
      })
    )
  }

  private setUpEligibleParents() {
    this.eligibleParents$ = this.selectedCard$
      .pipe(withLatestFrom(this.cards$))
      .pipe(
        map(([selectedCard, cards]) => {
          if (selectedCard) {
            return cards
              .filter(c => c.id !== selectedCard.id)
              .map(c => ({ id: c.id, title: c.title }))
              .sort((a, b) => (a.title < b.title ? -1 : 1))
          } else {
            return []
          }
        })
      )
  }

  private setUpGrandParent() {
    this.grandParent$ = this.parent$.pipe(
      withLatestFrom(this.cards$),
      map(([parentId, cards]) =>
        parentId ? cards.find(c => c.id == parentId) : null
      )
    )
  }
}
