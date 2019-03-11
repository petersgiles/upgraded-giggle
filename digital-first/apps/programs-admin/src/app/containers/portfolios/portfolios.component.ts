import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core'
import {
  AllPortfoliosSearch,
  AllPortfoliosSearchGQL
} from '../../generated/graphql'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'digital-first-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss']
})
export class PortfoliosComponent implements OnDestroy {
  portfolios: AllPortfoliosSearch.Portfolios[]
  subscriptions$: Subscription[] = []
  searchText = ''

  constructor(
    private allPortfoliosSearch: AllPortfoliosSearchGQL,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  add() {
    return this.router.navigate(['portfolios', 'add'], {
      skipLocationChange: true
    })
  }

  doSearch() {
    if (!this.searchText) {
      return
    }

    const searchSubscription$ = this.allPortfoliosSearch
      .watch(
        { title: this.searchText },
        {
          fetchPolicy: 'no-cache',
          context: { debounceKey: 'porfolios', debounceTimeout: 400 }
        }
      )
      .valueChanges.subscribe(value => {
        this.portfolios = value.data.portfolios
        this.changeDetector.detectChanges()
      })

    this.subscriptions$ = [...this.subscriptions$, searchSubscription$]
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions$) {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe()
      }
    }
  }
}
