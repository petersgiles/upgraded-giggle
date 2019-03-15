import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core'
import { AllGroupsSearchGQL } from '../../generated/graphql'
import { BehaviorSubject, Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { multiFilter } from '../../core/graphqlhelper'

interface GroupRow {
  title: string
  id: string
}

@Component({
  selector: 'digital-first-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsComponent implements OnInit, OnDestroy {
  subscription$: Subscription
  columns = [{ prop: 'title', name: 'Title' }]
  filterGroups$: BehaviorSubject<GroupRow[]>
  rows: GroupRow[]

  constructor(
    private searchGroupsGQL: AllGroupsSearchGQL,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  handleFilter($event: any) {
    const expression = $event.target.value.toLowerCase()

    if (!expression) {
      this.filterGroups$.next(this.rows)
      return
    }

    const filter = {
      title: expression
    }

    this.filterGroups$.next(multiFilter(this.rows, filter))
  }

  ngOnInit(): void {
    this.subscription$ = this.searchGroupsGQL
      .watch({}, { fetchPolicy: 'network-only' })
      .valueChanges.subscribe(value => {
        this.rows = value.data.groups.map(row => ({
          id: row.id,
          title: row.title
        }))

        this.filterGroups$ = new BehaviorSubject(this.rows)

        this.changeDetector.detectChanges()
      })
  }

  handleSelect(row: GroupRow) {
    return this.router.navigate(['groups/', row.id])
  }

  add() {
    return this.router.navigate(['groups', 'add'], { skipLocationChange: true })
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}
