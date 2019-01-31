import { Component, OnInit } from '@angular/core';
import { variable } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, Router } from '@angular/router'
import { ProjectGQL, Project } from '../../generated/graphql'
import {map } from 'rxjs/operators'
import {Subscription} from 'rxjs'
@Component({
  selector: 'digital-first-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private route: ActivatedRoute, private projectGQL: ProjectGQL){}
    projectId: string
    project: Project.Project
    projectSubscription$: Subscription

  ngOnInit() {

  this.projectId = this.route.snapshot.paramMap.get('id')
  console.log(this.projectId)
    this.projectSubscription$ = this.projectGQL
      .watch({projectId: this.projectId}, {fetchPolicy: 'network-only'})
      .valueChanges.pipe(map(value => value.data.project))
      .subscribe(project => {
        this.project = project
      })
  
    }



  


handleEditProject(item: any)
{
  console.log(item)
}


handleDeleteProject(item: any)
{
  console.log(item)
}

}
