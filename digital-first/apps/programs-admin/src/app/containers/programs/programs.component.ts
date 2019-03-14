import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { AllProgramsGQL } from '../../generated/graphql'
import { BehaviorSubject, Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { multiFilter } from '../../core/graphqlhelper'

interface ProgramRow {
  agency: string
  name: string
  id: string
}

@Component({
  selector: 'digital-first-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramsComponent implements OnInit, OnDestroy {
  subscription$: Subscription
  columns = [{ prop: 'name', name: 'Name' }, { prop: 'agency', name: 'Agency' }]
  filterPrograms$: BehaviorSubject<ProgramRow[]>
  rows: ProgramRow[]

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private allProgramsGql: AllProgramsGQL
  ) {}

  add() {
    return this.router.navigate(['programs', 'add'], {
      skipLocationChange: true
    })
  }

  handleFilter($event: any) {
    const expression = $event.target.value.toLowerCase()

    if (!expression) {
      this.filterPrograms$.next(this.rows)
      return
    }

    const filter = {
      name: expression,
      agency: expression
    }

    this.filterPrograms$.next(multiFilter(this.rows, filter))
  }

  ngOnInit(): void {
    this.subscription$ = this.allProgramsGql
      .watch({}, { fetchPolicy: 'network-only' })
      .valueChanges.subscribe(value => {
        this.rows = value.data.programs.map(row => ({
          id: row.id,
          name: row.name,
          agency: row.agency.title
        }))

        this.filterPrograms$ = new BehaviorSubject(this.rows)

        this.changeDetector.detectChanges()
      })
  }

  handleSelect(row: ProgramRow) {
    return this.router.navigate(['programs/', row.id])
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}
