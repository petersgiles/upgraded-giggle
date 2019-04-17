import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ProjectGQL, ProjectQuery } from '../../generated/graphql'
import { map } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { MdcDialog } from '@angular-mdc/web'
import { DateTimeFormat } from '../../date-time-format'
type Project = ProjectQuery['project']

@Component({
  selector: 'digital-first-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private projectGQL: ProjectGQL,
    public dialog: MdcDialog,
    private dateTimeFormat: DateTimeFormat
  ) {}
  projectId: string
  project: Project
  projectSubscription$: Subscription

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id')

    this.projectSubscription$ = this.projectGQL
      .watch({ id: this.projectId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.project))
      .subscribe(project => {
        this.project = project
        this.project.programSubmission.dataDate = this.dateTimeFormat.formatDate(
          this.project.programSubmission.dataDate
        )
        this.project.programSubmission.timeStamp = this.dateTimeFormat.formatDateTime(
          this.project.programSubmission.timeStamp
        )
      })
  }

  ngOnDestroy(): void {
    this.projectSubscription$.unsubscribe()
  }
}
