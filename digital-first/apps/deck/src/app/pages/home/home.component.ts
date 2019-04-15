import { Component, OnInit, OnDestroy, Injectable } from '@angular/core'
import {
  DeckItem,
  DeckHelper,
  CardType,
  DialogAreYouSureComponent,
  DeckItemMedia
} from '@df/components'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { map, first, tap, withLatestFrom } from 'rxjs/operators'
import { Observable, BehaviorSubject, combineLatest, Subscribable } from 'rxjs'
import { GetDeckItemsGQL, StoreGQL } from '../../generated/deck-schema'
import { MdcDialog } from '@angular-mdc/web'
import { Subscription } from 'rxjs'
import { _FEATURE_CONFIGS } from '@ngrx/store/src/tokens'

@Component({
  selector: 'digital-first-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private dialog: MdcDialog,
    private getDeckItems: GetDeckItemsGQL,
    private upsertDeckItem: StoreGQL
  ) {}

  public parent$: BehaviorSubject<string> = new BehaviorSubject(null)
  public selectedCard$: BehaviorSubject<DeckItem> = new BehaviorSubject(null)
  public cardTypes$: BehaviorSubject<string[]> = new BehaviorSubject(
    Object.keys(CardType).map(ct => CardType[ct] as string)
  )
  public grandParent$: Observable<DeckItem>
  public eligibleParents$: Observable<{ id: string; title: string }[]>
  public cards$: Observable<DeckItem[]>
  private mySubscription: Subscription

  ngOnInit() {
    this.mySubscription = this.parent$.subscribe({
      next: parentid => {
        this.cards$ = this.getDeckItems
          .watch({ id: parentid }, { fetchPolicy: 'network-only' })
          .valueChanges.pipe(map((result: any) => result.data.deckItems))
      }
    })

    this.mySubscription.add(
      this.route.paramMap
        .pipe(
          first(),
          map((params: ParamMap) => params.get('parent'))
        )
        .subscribe((parent: any) => {
          this.parent$.next(parent)
        })
    )
  }

  ngOnDestroy(): void {
    this.mySubscription.unsubscribe()
  }

  handleSubmitted($event: DeckItem) {
    this.cards$.pipe(
      map(data => {
        const oldCard = data.find(p => p.id === $event.id)
        if (oldCard.parent !== $event.parent) {
          if (DeckHelper.isSelectedParentACurrentDescendant($event, data)) {
            DeckHelper.liftUpChildren(oldCard, data)
          }
        }
      })
    )
    this.upsertDeckItem.mutate({ item: {} })
    this.selectedCard$.next(null)
  }

  handleCancel($event) {
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
    this.setUpEligibleParents()
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
}
