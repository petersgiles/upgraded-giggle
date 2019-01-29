import {Component, OnDestroy} from '@angular/core'
import {AllStatisticsSearch, AllStatisticsSearchGQL} from '../../generated/graphql'
import {Router} from '@angular/router'
import {Subscription} from 'rxjs'

@Component({
  selector: 'digital-first-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnDestroy {

  statistics: AllStatisticsSearch.Statistics[]
  subscriptions$: Subscription[] = []
  searchText = ''

  constructor(private searchStatisticsGQL: AllStatisticsSearchGQL,
              private router: Router) {
  }

  doSearch() {
    if (!this.searchText) {
      return
    }

    const searchSubscription$ = this.searchStatisticsGQL
      .watch({name: this.searchText}, {fetchPolicy: 'no-cache'})
      .valueChanges.subscribe(value => {
        this.statistics = value.data.statistics
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
