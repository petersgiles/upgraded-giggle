import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core'
import { AllStatisticsSearchGQL } from '../../generated/graphql'
import { Router } from '@angular/router'
import { BehaviorSubject, Subscription } from 'rxjs'
import { multiFilter } from '../../core/graphqlhelper'

interface StatisticRow {
  agency: string
  name: string
  id: string
}

@Component({
  selector: 'digital-first-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit, OnDestroy {
  subscription$: Subscription
  columns = [{ prop: 'name', name: 'Name' }, { prop: 'agency', name: 'Agency' }]
  filterStatistics$: BehaviorSubject<StatisticRow[]>
  rows: StatisticRow[]

  constructor(
    private searchStatisticsGQL: AllStatisticsSearchGQL,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  add() {
    return this.router.navigate(['statistics', 'add'], {
      skipLocationChange: true
    })
  }

  handleFilter($event: any) {
    const expression = $event.target.value.toLowerCase()

    if (!expression) {
      this.filterStatistics$.next(this.rows)
      return
    }

    const filter = {
      name: expression,
      agency: expression
    }

    this.filterStatistics$.next(multiFilter(this.rows, filter))
  }

  ngOnInit(): void {
    this.subscription$ = this.searchStatisticsGQL
      .watch({}, { fetchPolicy: 'network-only' })
      .valueChanges.subscribe(value => {
        this.rows = value.data.statistics.map(row => ({
          id: row.id,
          name: row.name,
          agency: row.agency.title
        }))

        this.filterStatistics$ = new BehaviorSubject(this.rows)

        this.changeDetector.detectChanges()
      })
  }

  handleSelect(row: StatisticRow) {
    return this.router.navigate(['statistics/', row.id])
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}
