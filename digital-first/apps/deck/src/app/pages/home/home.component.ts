import { Component, OnInit, OnDestroy } from '@angular/core'
import { DeckItem } from '@df/components'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { map, first, tap } from 'rxjs/operators'
import { Observable, BehaviorSubject } from 'rxjs'
import { GetDeckItemsGQL } from '../../generated/graphql'
import { MdcDialog } from '@angular-mdc/web'
import {
  EDIT_DECK_ITEM_CLOSE,
  DialogEditDeckItemComponent
} from '../../dialogs/dialog-edit-deck-item.component'

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
  public grandParent$: Observable<DeckItem>
  public displayCards$: Observable<DeckItem[]>

  ngOnInit() {
    this.getDeckItems
      .fetch({ id: null }, { fetchPolicy: 'network-only' })
      .pipe(
        // tslint:disable-next-line:no-console
        tap((result: any) => console.log(result.data.deckItems))
      )
      .subscribe((result: any) => {
        this.cards$.next(result.data.deckItems)
      })

    this.route.paramMap
      .pipe(
        first(),
        map((params: ParamMap) => +params.get('parent'))
      )
      .subscribe((parent: any) => this.parent$.next(parent))
  }

  ngOnDestroy(): void {}

  handleAction($event) {
    // tslint:disable-next-line:no-console
    console.log($event)
  }

  handleEdit($event) {

    // tslint:disable-next-line:no-console
    console.log($event)

    const deckItems = this.cards$.getValue()

    const dialogRef = this.dialog.open(DialogEditDeckItemComponent, {
      escapeToClose: true,
      clickOutsideToClose: true,
      data: {
        deckItems: deckItems
      }
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== EDIT_DECK_ITEM_CLOSE && result) {
      }
    })
  }
}
