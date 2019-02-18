import { Component, OnDestroy, OnInit } from '@angular/core'
import { AllUsersSearch, AllUsersSearchGQL } from '../../generated/graphql'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router'
@Component({
  selector: 'digital-first-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy {
  users: AllUsersSearch.Users[]
  subscriptions$: Subscription[] = []
  searchText = ''

  constructor(private allUsersSearchGQL: AllUsersSearchGQL,   private router: Router) {}

  doSearch() {
    if (!this.searchText) {
      return
    }

    const searchSubscription$ = this.allUsersSearchGQL
      .watch(
        { emailAddress: this.searchText },
        {
          fetchPolicy: 'no-cache',
          context: { debounceKey: 'users', debounceTimeout: 400 }
        }
      )
      .valueChanges.subscribe(value => {
        this.users = value.data.users
      })

    this.subscriptions$ = [...this.subscriptions$, searchSubscription$]
  }

 add()  {
 return this.router.navigate(['users', 'add'])
 }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions$) {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe()
      }
    }
  }
}
