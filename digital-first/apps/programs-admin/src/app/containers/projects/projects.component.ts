import {
  Component,
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
import { DateTimeFormat } from '../../date-time-format'
import { FormBuilder, Validators } from '@angular/forms'

interface ProjectRow {
  id: string
  name: string
  submissionDate: string
  dataDate: string
  programName: string
}

@Component({
  selector: 'digital-first-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnDestroy {
  subscriptions$: Subscription[] = []
  columns = [
    { prop: 'name', name: 'Project' },
    { prop: 'programName', name: 'Program' },
    { prop: 'dataDate', name: 'Data date' },
    { prop: 'submissionDate', name: 'Submission date' }
  ]
  filterProjects$: BehaviorSubject<ProjectRow[]>
  rows: ProjectRow[]
  allProjectsSearch: AllProjectsSearchQuery
  formSubmitted = false
  projectSearchForm = this.formBuilder.group({
    searchText: [null, Validators.required]
  })
  constructor(
    private searchProjectsGQL: AllProjectsSearchGQL,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private dateTimeFormat: DateTimeFormat,
    private formBuilder: FormBuilder
  ) {}

  doSearch() {
    this.formSubmitted = true
    var searchText = this.projectSearchForm.value['searchText']
    if (!searchText) {
      return
    }

    const searchsubscription$ = this.searchProjectsGQL
      .watch({ name: searchText }, { fetchPolicy: 'network-only' })
      .valueChanges.subscribe(value => {
        this.rows = value.data.projects.map(row => ({
          id: row.id,
          name: row.name,
          submissionDate: this.dateTimeFormat.formatDateTime(
            row.programSubmission.timeStamp
          ),
          dataDate: this.dateTimeFormat.formatDate(
            row.programSubmission.dataDate
          ),
          programName: row.program.name
        }))

        this.filterProjects$ = new BehaviorSubject(this.rows)

        this.changeDetector.detectChanges()
      })
    this.subscriptions$ = [...this.subscriptions$, searchsubscription$]
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
    for (const subscription of this.subscriptions$) {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe()
      }
    }
    if (this.filterProjects$ && this.filterProjects$.unsubscribe) {
      this.filterProjects$.unsubscribe()
    }
  }
}
