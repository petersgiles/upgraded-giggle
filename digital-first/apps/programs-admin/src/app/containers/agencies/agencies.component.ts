import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { AllAgenciesSearchGQL } from '../../generated/graphql'
import { BehaviorSubject, Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { multiFilter } from '../../core/graphqlhelper'

interface AgencyRow {
  title: string
  id: string
  portfolio: string
}

@Component({
  selector: 'digital-first-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgenciesComponent implements OnInit, OnDestroy {
  subscription$: Subscription
  columns = [
    { prop: 'title', name: 'Name' },
    { prop: 'portfolio', name: 'Portfolio' }
  ]
  filterAgencies$: BehaviorSubject<AgencyRow[]>
  rows: AgencyRow[]

  constructor(
    private allAgenciesSearchGql: AllAgenciesSearchGQL,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  add() {
    return this.router.navigate(['agencies', 'add'], {
      skipLocationChange: true
    })
  }

  ngOnInit(): void {
    this.subscription$ = this.allAgenciesSearchGql
      .watch({}, { fetchPolicy: 'network-only' })
      .valueChanges.subscribe(value => {
        this.rows = value.data.agencies.map(row => ({
          id: row.id,
          title: row.title,
          portfolio: row.portfolio.title
        }))

        this.filterAgencies$ = new BehaviorSubject(this.rows)

        this.changeDetector.detectChanges()
      })
  }

  handleFilter($event: any) {
    const expression = $event.target.value.toLowerCase()

    if (!expression) {
      this.filterAgencies$.next(this.rows)
      return
    }

    const filter = {
      title: expression,
      portfolio: expression
    }

    this.filterAgencies$.next(multiFilter(this.rows, filter))
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  handleSelect(row: AgencyRow) {
    return this.router.navigate(['agencies/', row.id])
  }
}
