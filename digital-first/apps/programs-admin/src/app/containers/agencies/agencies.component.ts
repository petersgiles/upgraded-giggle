import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core'
import {
  AllAgenciesSearchGQL,
  AllAgenciesSearch
} from '../../generated/graphql'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'digital-first-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgenciesComponent implements OnDestroy {
  constructor(
    private allAgenciesSearchGql: AllAgenciesSearchGQL,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  agencies: AllAgenciesSearch.Agencies[]
  subscriptions$: Subscription[] = []
  searchText = ''

  add() {
    return this.router.navigate(['agencies', 'add'])
  }

  doSearch() {
    if (!this.searchText) {
      return
    }

    const searchSubscription$ = this.allAgenciesSearchGql
      .watch({ title: this.searchText }, { fetchPolicy: 'no-cache' })
      .valueChanges.subscribe(value => {
        this.agencies = value.data.agencies
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
