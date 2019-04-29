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
import { MdcDialog } from '@angular-mdc/web'

@Component({
  selector: 'digital-first-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private dialog: MdcDialog) {}

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
    this.route.paramMap
      .pipe(
        first(),
        map((params: ParamMap) => +params.get('parent'))
      )
      .subscribe((parent: any) => this.parent$.next(parent))
  }
  ngOnDestroy(): void {}

  handleSubmitted($event: DeckItem) {}

  handleCancel($event) {}

  handleAction($event) {}

  handleEdit($event) {}

  handleGoBack($event) {}
}
