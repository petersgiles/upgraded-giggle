import { Component, OnInit, OnDestroy } from '@angular/core'
import { DeckItem, CardType } from '@df/components'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { map, first } from 'rxjs/operators'

@Component({
  selector: 'digital-first-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        first(),
        map((params: ParamMap) => +params.get('parent')),
        map(parent => {})
      )
      .subscribe()
  }

  ngOnDestroy(): void {}

  cards: DeckItem[]

  handleAddItemDialog() {}
}
