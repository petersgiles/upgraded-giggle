import {Component, OnDestroy} from '@angular/core'
import {AllGroupsSearch, AllGroupsSearchGQL} from '../../generated/graphql'
import {Subscription} from 'rxjs'
import {Router} from '@angular/router'

@Component({
  selector: 'digital-first-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnDestroy {

  groups: AllGroupsSearch.Groups[]
  subscriptions$: Subscription[] = []
  searchText = ''

  constructor(private searchGroupsGQL: AllGroupsSearchGQL,
              private router: Router) {
  }

  add() {
    return this.router.navigate(['groups', 'add'])
  }

  doSearch() {
    if (!this.searchText) {
      return
    }

    const searchSubscription$ = this.searchGroupsGQL
      .watch({title: this.searchText}, {fetchPolicy: 'no-cache'})
      .valueChanges.subscribe(value => {
        this.groups = value.data.groups
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
