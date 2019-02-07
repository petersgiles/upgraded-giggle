import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core'
import {
  AllStatisticsSearch,
  AllStatisticsSearchGQL
} from '../../generated/graphql'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'digital-first-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnDestroy {
  statistics: AllStatisticsSearch.Statistics[]
  subscriptions$: Subscription[] = []
  searchText = ''

  constructor(
    private searchStatisticsGQL: AllStatisticsSearchGQL,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  doSearch() {
    if (!this.searchText) {
      return
    }

    const searchSubscription$ = this.searchStatisticsGQL
      .watch(
        { name: this.searchText },
        {
          fetchPolicy: 'no-cache',
          context: { debounceKey: 'statistics', debounceTimeout: 400 }
        }
      )
      .valueChanges.subscribe(value => {
        this.statistics = value.data.statistics
        this.changeDetector.detectChanges()
      })

    this.subscriptions$ = [...this.subscriptions$, searchSubscription$]
  }

  add() {
    return this.router.navigate(['statistics', 'add'])
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions$) {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe()
      }
    }
  }
}
