import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ProjectGQL, Project } from '../../generated/graphql'
import { map, first } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { MdcDialog } from '@angular-mdc/web'
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
    private router: Router
  ) {}
  projectId: string
  project: Project.Project
  projectSubscription$: Subscription

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id')

    this.projectSubscription$ = this.projectGQL
      .watch({ id: this.projectId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.project))
      .subscribe(project => {
        this.project = project
      })
  }

  ngOnDestroy(): void {
    this.projectSubscription$.unsubscribe()
  }
}
