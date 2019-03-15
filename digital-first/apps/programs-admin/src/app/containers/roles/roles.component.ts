import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'

import { Router } from '@angular/router'
import { RolesSearchGQL } from '../../generated/graphql'
import { BehaviorSubject, Subscription } from 'rxjs'
import { multiFilter } from '../../core/graphqlhelper'

interface RoleRow {
  id: string
  name: string
  description: string
}

@Component({
  selector: 'digital-first-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesComponent implements OnInit, OnDestroy {
  subscription$: Subscription
  columns = [
    { prop: 'name', name: 'Name' },
    { prop: 'description', name: 'Description' }
  ]
  filterRoles$: BehaviorSubject<RoleRow[]>
  rows: RoleRow[]

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private allRolesSearchGql: RolesSearchGQL
  ) {}

  handleFilter($event: any) {
    const expression = $event.target.value.toLowerCase()

    if (!expression) {
      this.filterRoles$.next(this.rows)
      return
    }

    const filter = {
      name: expression,
      description: expression
    }

    this.filterRoles$.next(multiFilter(this.rows, filter))
  }

  ngOnInit(): void {
    this.subscription$ = this.allRolesSearchGql
      .watch({}, { fetchPolicy: 'network-only' })
      .valueChanges.subscribe(value => {
        this.rows = value.data.roles.map(row => ({
          id: row.id,
          name: row.title,
          description: row.description
        }))

        this.filterRoles$ = new BehaviorSubject(this.rows)

        this.changeDetector.detectChanges()
      })
  }

  add() {
    return this.router.navigate(['roles', 'add'], {
      skipLocationChange: true
    })
  }

  handleSelect(row: RoleRow) {
    return this.router.navigate(['roles/', row.id])
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}
