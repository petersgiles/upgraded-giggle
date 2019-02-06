import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ProjectGQL, Project, DeleteProjectGQL } from '../../generated/graphql'
import {map, first } from 'rxjs/operators'
import {Subscription} from 'rxjs'
import {ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent} from '@digital-first/df-dialogs'
import {MdcDialog} from '@angular-mdc/web'
@Component({
  selector: 'digital-first-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private projectGQL: ProjectGQL, private deleteProjectGQL: DeleteProjectGQL,  public dialog: MdcDialog, private router: Router){}
    projectId: string
    project: Project.Project
    projectSubscription$: Subscription

  ngOnInit() {

  this.projectId = this.route.snapshot.paramMap.get('id')

    this.projectSubscription$ = this.projectGQL
      .watch({id: this.projectId}, {fetchPolicy: 'network-only'})
      .valueChanges.pipe(map(value => value.data.project))
      .subscribe(project => {
        this.project = project
      })
   }

handleEditProject(project : Project.Project)
{
  return this.router.navigate(['projects/edit', project.id])
}


handleDeleteProject(project : Project.Project) {
  const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
    escapeToClose: true,
    clickOutsideToClose: true
  })

  dialogRef
    .afterClosed()
    .pipe(first())
    .subscribe(result => {
      if (result === ARE_YOU_SURE_ACCEPT && this.project) {
        this.deleteProjectGQL
          .mutate(
            {
              data: {
                id: project.id
              }
            },
            {}
          )
          .subscribe(value => this.router.navigate(['projects']))
      }
    })
}

ngOnDestroy(): void {
  this.projectSubscription$.unsubscribe()
}

}
