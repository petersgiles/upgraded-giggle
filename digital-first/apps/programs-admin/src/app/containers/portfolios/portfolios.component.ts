import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core'
import { AllPortfoliosSearchGQL } from '../../generated/graphql'
import { BehaviorSubject, Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { multiFilter } from '../../core/graphqlhelper'

interface PortfolioRow {
  title: string
  id: string
}

@Component({
  selector: 'digital-first-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss']
})
export class PortfoliosComponent implements OnInit, OnDestroy {
  subscription$: Subscription
  columns = [{ prop: 'title', name: 'Name' }]
  filterPortfolios$: BehaviorSubject<PortfolioRow[]>
  rows: PortfolioRow[]

  constructor(
    private allPortfoliosSearch: AllPortfoliosSearchGQL,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  handleFilter($event: any) {
    const expression = $event.target.value.toLowerCase()

    if (!expression) {
      this.filterPortfolios$.next(this.rows)
      return
    }

    const filter = {
      title: expression
    }

    this.filterPortfolios$.next(multiFilter(this.rows, filter))
  }

  add() {
    return this.router.navigate(['portfolios', 'add'], {
      skipLocationChange: true
    })
  }

  ngOnDestroy(): void {}

  handleSelect(row: PortfolioRow) {
    return this.router.navigate(['portfolios/', row.id])
  }

  ngOnInit(): void {
    this.subscription$ = this.allPortfoliosSearch
      .watch({}, { fetchPolicy: 'network-only' })
      .valueChanges.subscribe(value => {
        this.rows = value.data.portfolios.map(row => ({
          id: row.id,
          title: row.title
        }))

        this.filterPortfolios$ = new BehaviorSubject(this.rows)

        this.changeDetector.detectChanges()
      })
  }
}
