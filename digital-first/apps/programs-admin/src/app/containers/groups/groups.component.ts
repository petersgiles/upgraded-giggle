import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core'
import { AllGroupsSearch, AllGroupsSearchGQL } from '../../generated/graphql'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'digital-first-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsComponent implements OnDestroy {
  groups: AllGroupsSearch.Groups[]
  subscriptions$: Subscription[] = []
  searchText = ''

  constructor(
    private searchGroupsGQL: AllGroupsSearchGQL,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  add() {
    return this.router.navigate(['groups', 'add'], { skipLocationChange: true })
  }

  doSearch() {
    if (!this.searchText) {
      return
    }

    const searchSubscription$ = this.searchGroupsGQL
      .watch(
        { title: this.searchText },
        {
          fetchPolicy: 'no-cache',
          context: { debounceKey: 'groups', debounceTimeout: 400 }
        }
      )
      .valueChanges.subscribe(value => {
        this.groups = value.data.groups
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
