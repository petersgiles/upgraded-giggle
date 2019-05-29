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
  SetSelectedDeckItem,
  GetBriefs
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
  parentDeckItem$: any
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
      )
      .subscribe((parent: any) => {
        this.store.dispatch(new SetActiveParent({ id: parent }))
      })

    this.deckItems$ = this.store.pipe(
      select(fromDeck.selectCardsByParentState),
    )

    this.parent$ = this.store.pipe(
      select(fromDeck.selectCurrentParentState),
    )

    this.parentDeckItem$ = this.store.pipe(
      select(fromDeck.selectCurrentParentCardState),
    )

    this.eligibleParents$ = this.store.pipe(
      select(fromDeck.selectCurrentParentState),
    )

    this.selected$ = this.store.pipe(
      select(fromDeck.selectSelectedCardState),
    )

    this.briefs$ = this.store.pipe(
      select(fromDeck.selectCurrentBriefsState),
    )

    this.store.dispatch(new GetDeckItems({ parent: null }))
    this.store.dispatch(new GetBriefs(null))
  }

  ngOnDestroy(): void {}

  stopBreak(title){
    return (title || '').split(' ').join('&nbsp;')
  }

  handleSubmitted(deckItem: DeckItem) {
    this.store.dispatch(new UpdateDeckItem(deckItem))
    this.store.dispatch(new SetSelectedDeckItem({ id: null }))
  }

  handleCancelled($event) {
    this.store.dispatch(new SetSelectedDeckItem({ id: null }))
  }

  handleAction($event: DeckItem | any) {

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
    this.store.dispatch(new EditDeckItem(deckItem))
  }

  handleGoToParent(parentDeckItem: DeckItem) {
    const url = ['/', 'deck']

    if (parentDeckItem.parent) {
      url.push(parentDeckItem.parent)
    }

    this.router.navigate(url)
  }

  handleGoBack($event) {

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
          }
        })
    } else {
      this.store.dispatch(new GoBack())
    }
  }
}
