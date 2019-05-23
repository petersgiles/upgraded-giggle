import { Component, OnInit, OnDestroy, Injectable } from '@angular/core'
import { DialogAreYouSureComponent } from '@df/components'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { map, first, tap } from 'rxjs/operators'
import { Observable, BehaviorSubject, EMPTY, Subscription } from 'rxjs'
import { MdcDialog } from '@angular-mdc/web'

import { _FEATURE_CONFIGS } from '@ngrx/store/src/tokens'
import { FormBuilder } from '@angular/forms'
import { Store, select } from '@ngrx/store'
import * as fromDeck from '../../reducers/deck/deck.reducer'
import {
  SetActiveParent,
  GoBack,
  GetDeckItems,
  EditDeckItem,
  UpdateDeckItem,
  SetSelectedDeckItem
} from '../../reducers/deck/deck.actions'
import { CardType, DeckItem } from '../../components/deck'

@Component({
  selector: 'digital-first-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public parent$: Observable<any>
  public selectedCard: DeckItem
  public cardTypes$: BehaviorSubject<string[]> = new BehaviorSubject(
    Object.keys(CardType).map(ct => CardType[ct] as string)
  )
  public grandParent$: Observable<DeckItem>
  public eligibleParents$: Observable<{ id: string; title: string }[]>
  public deckItems$: Observable<DeckItem[]>
  public briefs$: Observable<{ id: string; name: string }[]>

  public selected$: Observable<any>
  // tslint:disable-next-line:no-empty
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromDeck.State>,
    public dialog: MdcDialog
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        first(),
        map((params: ParamMap) => params.get('parent')),
        // tslint:disable-next-line: no-console
        tap(result => console.log(`👹 `, result))
      )
      .subscribe((parent: any) => {
        this.store.dispatch(new SetActiveParent({ id: parent }))
      })

    this.deckItems$ = this.store.pipe(
      select(fromDeck.selectCardsByParentState),
      // tslint:disable-next-line: no-console
      tap(result => console.log(`👹 `, result))
    )

    this.parent$ = this.store.pipe(
      select(fromDeck.selectCurrentParentState),
      // tslint:disable-next-line: no-console
      tap(result => console.log(`👹 `, result))
    )

    this.eligibleParents$ = this.store.pipe(
      select(fromDeck.selectCurrentParentState),
      // tslint:disable-next-line: no-console
      tap(result => console.log(`👹 `, result))
    )

    this.selected$ = this.store.pipe(
      select(fromDeck.selectSelectedCardState),
      // tslint:disable-next-line: no-console
      tap(result => console.log(`👹 `, result))
    )

    this.store.dispatch(new GetDeckItems({ parent: null }))
  }

  ngOnDestroy(): void {}

  handleSubmitted(deckItem: DeckItem) {
    // tslint:disable-next-line: no-console
    console.log(`👹 handleSubmitted `, deckItem)
    this.store.dispatch(new UpdateDeckItem(deckItem))
    this.store.dispatch(new SetSelectedDeckItem({ id: null }))
  }

  handleCancelled($event) {
    // tslint:disable-next-line: no-console
    console.log(`👹 handleCancel `, $event)
    this.store.dispatch(new SetSelectedDeckItem({ id: null }))
  }

  handleAction($event: DeckItem | any) {
    // tslint:disable-next-line: no-console
    console.log(`👹 handleAction `, $event)

    if ($event) {
      if ($event.url) {
        this.router.navigate([$event.url])
        return
      }

      if ($event.cardType === CardType.Parent) {
        this.router.navigate(['/', 'deck', $event.id])
        return
      }
    }
  }

  handleEdit(deckItem: DeckItem) {
    // tslint:disable-next-line: no-console
    console.log(`👹 handleEdit `, deckItem)
    this.store.dispatch(new EditDeckItem(deckItem))
  }

  handleGoBack($event) {
    // tslint:disable-next-line: no-console
    console.log(`👹 `, $event)

    if (this.selectedCard) {
      const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
        data: `It looks like you have been editing a card: ${
          this.selectedCard.title
        } . If you leave before saving, your changes will be lost.`
      })
      dialogRef
        .afterClosed()
        .pipe(first())
        .subscribe(result => {
          if (result === 'accept') {
            this.store.dispatch(new GoBack())
            this.selectedCard = null
          }
        })
    } else {
      this.store.dispatch(new GoBack())
    }
  }
}
