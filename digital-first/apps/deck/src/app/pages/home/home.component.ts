import { Component, OnInit, OnDestroy } from '@angular/core'
import { DeckItem, CardType } from '@df/components'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { map, first, switchMap } from 'rxjs/operators'
import { Observable, BehaviorSubject } from 'rxjs'
import { GetDeckItemsGQL } from '../../generated/graphql'
import { ApolloQueryResult } from 'apollo-client'
import { Query } from 'apollo-angular'
import { MdcDialog } from '@angular-mdc/web'
import { EDIT_DECK_ITEM_CLOSE, DialogEditDeckItemComponent } from '../../dialogs/dialog-edit-deck-item.component'

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

  public cards$: BehaviorSubject<DeckItem[]> = new BehaviorSubject(null)
  public parent$: BehaviorSubject<string> = new BehaviorSubject(null)
  public grandParent$: Observable<DeckItem>
  public displayCards$: Observable<DeckItem[]>

  ngOnInit() {
    // this.displayCards$ = this.parent$
    // .pipe(
    //   switchMap(parent =>
    //     this.getDeckItems
    //     .fetch({ id: parent }, { fetchPolicy: 'network-only' })
    //     // .pipe(
    //     //   map((result: ApolloQueryResult<Query) => [])
    //     //   )
    //   ))

    this.route.paramMap
      .pipe(
        first(),
        map((params: ParamMap) => +params.get('parent'))
      )
      .subscribe((parent: any) => this.parent$.next(parent))
  }

  ngOnDestroy(): void {}

  cards: DeckItem[]

  handleAddItemDialog() {
    const dialogRef = this.dialog.open(DialogEditDeckItemComponent, {
      escapeToClose: true,
      clickOutsideToClose: true,
      data: {
        deckItems: []
      }
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== EDIT_DECK_ITEM_CLOSE && result) {

      }
    })
  }
}
