import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { AllUsersSearch, AllUsersSearchGQL } from '../../generated/graphql'
import { BehaviorSubject, Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { multiFilter } from '../../core/graphqlhelper'

interface UserRow {
  id: string
  emailAddress: string
  lastLogin: string
}

@Component({
  selector: 'digital-first-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  subscription$: Subscription
  columns = [
    { prop: 'emailAddress', name: 'User' },
    { prop: 'lastLogin', name: 'Last login' }
  ]
  filterUsers$: BehaviorSubject<UserRow[]>
  rows: UserRow[]

  constructor(
    private changeDetector: ChangeDetectorRef,
    private allUsersSearchGQL: AllUsersSearchGQL,
    private router: Router
  ) {}

  add() {
    return this.router.navigate(['users', 'add'])
  }

  handleFilter($event: any) {
    const expression = $event.target.value.toLowerCase()

    if (!expression) {
      this.filterUsers$.next(this.rows)
      return
    }

    const filter = {
      emailAddress: expression
    }

    this.filterUsers$.next(multiFilter(this.rows, filter))
  }

  ngOnInit(): void {
    this.subscription$ = this.allUsersSearchGQL
      .watch({}, { fetchPolicy: 'network-only' })
      .valueChanges.subscribe(value => {
        this.rows = value.data.users.map(row => ({
          id: row.id,
          emailAddress: row.emailAddress,
          lastLogin: row.lastLogin
        }))

        this.filterUsers$ = new BehaviorSubject(this.rows)

        this.changeDetector.detectChanges()
      })
  }

  handleSelect(row: UserRow) {
    return this.router.navigate(['users/', row.id])
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}
