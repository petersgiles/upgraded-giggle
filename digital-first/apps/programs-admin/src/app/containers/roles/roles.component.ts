import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'

import { Router } from '@angular/router'
import { RolesSearch, RolesSearchGQL, Maybe } from '../../generated/graphql'
import { Subscription } from 'rxjs'

@Component({
  selector: 'digital-first-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesComponent implements OnInit, OnDestroy {
  subscriptions$: Subscription[] = []
  searchText = ''
  roles: Maybe<Maybe<RolesSearch.Roles>[]>

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private allRolesSearchGql: RolesSearchGQL
  ) {}

  ngOnInit() {}

  doSearch() {
    if (!this.searchText) {
      return
    }

    const searchSubscription$ = this.allRolesSearchGql
      .watch(
        { title: this.searchText },
        {
          fetchPolicy: 'no-cache',
          context: { debounceKey: 'roles', debounceTimeout: 400 }
        }
      )
      .valueChanges.subscribe(value => {
        this.roles = value.data.roles
        this.changeDetector.detectChanges()
      })

    this.subscriptions$ = [...this.subscriptions$, searchSubscription$]
  }

  add() {
    return this.router.navigate(['roles', 'add'], {
      skipLocationChange: true
    })
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions$) {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe()
      }
    }
  }
}
