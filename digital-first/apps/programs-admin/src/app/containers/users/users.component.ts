import { Component, OnDestroy, OnInit } from '@angular/core'
import { AllUsersSearch, AllUsersSearchGQL } from '../../generated/graphql'
import { Subscription } from 'rxjs'

@Component({
  selector: 'digital-first-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy {
  users: AllUsersSearch.Users[]
  subscriptions$: Subscription[] = []
  searchText = ''

  constructor(private allUsersSearchGQL: AllUsersSearchGQL) {}

  doSearch() {
    if (!this.searchText) {
      return
    }

    const searchSubscription$ = this.allUsersSearchGQL
      .watch(
        { emailAddress: this.searchText },
        {
          fetchPolicy: 'no-cache',
          context: { debounceKey: 'users', debounceTimeout: 300 }
        }
      )
      .valueChanges.subscribe(value => {
        this.users = value.data.users
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
