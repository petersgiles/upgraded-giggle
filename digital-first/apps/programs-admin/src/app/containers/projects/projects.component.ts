import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core'
import {
  AllProjectsSearchGQL,
  AllProjectsSearchQuery
} from '../../generated/graphql'
import { BehaviorSubject, Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { multiFilter } from '../../core/graphqlhelper'
interface ProjectRow {
  id: string
  name: string
  submissionDate: string
}

@Component({
  selector: 'digital-first-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnDestroy, OnInit {
  subscription$: Subscription
  columns = [
    { prop: 'name', name: 'Project' },
    { prop: 'submissionDate', name: 'Date' }
  ]
  filterProjects$: BehaviorSubject<ProjectRow[]>
  rows: ProjectRow[]
  allProjectsSearch: AllProjectsSearchQuery

  constructor(
    private searchProjectsGQL: AllProjectsSearchGQL,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription$ = this.searchProjectsGQL
      .watch({}, { fetchPolicy: 'network-only' })
      .valueChanges.subscribe(value => {
        this.rows = value.data.projects.map(row => ({
          id: row.id,
          name: row.name,
          submissionDate: row.programSubmission.timeStamp
        }))

        this.filterProjects$ = new BehaviorSubject(this.rows)

        this.changeDetector.detectChanges()
      })
  }

  handleSelect(row) {
    return this.router.navigate(['projects/', row.id])
  }

  handleFilter($event: any) {
    const expression = $event.target.value.toLowerCase()

    if (!expression) {
      this.filterProjects$.next(this.rows)
      return
    }

    const filter = {
      name: expression
    }

    this.filterProjects$.next(multiFilter(this.rows, filter))
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}
