import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import {
   AllPrograms, AllProgramsGQL, UpdateProjectGQL, Project, ProjectGQL
} from '../../../generated/graphql'
import { ActivatedRoute, Router } from '@angular/router'
import { map } from 'rxjs/operators'
import { Subscription } from 'rxjs'

@Component({
   selector: 'digital-first-project-edit',
   templateUrl: './project-edit.component.html',
   styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit, OnDestroy {

   programsSubscription$: Subscription
   rowVersion: string
   projectId: string
   programs: AllPrograms.Programs[]
   projectSubscription$: Subscription
   project: Project.Project
   editProjectForm = this.formBuilder.group({
      projectName: [null, Validators.required],
      externalId: [null],
      notes: [''],
      programId: [null, Validators.required]
   })

   constructor(private formBuilder: FormBuilder,
      private allProgramsGQL: AllProgramsGQL,
      private projectGQL: ProjectGQL,
      private updateProjectGQL: UpdateProjectGQL,
      private router: Router,
      private route: ActivatedRoute) {
   }

   ngOnInit() {
      this.projectId = this.route.snapshot.paramMap.get('id')
      this.programsSubscription$ = this.allProgramsGQL
         .watch({}, { fetchPolicy: 'cache-first' })
         .valueChanges.pipe(map(result => result.data.programs)).subscribe(value => {
            this.programs = value
         }
         )

      this.projectSubscription$ = this.projectGQL
         .watch({ id: this.projectId }, { fetchPolicy: 'network-only' })
         .valueChanges.pipe(map(value => value.data.project))
         .subscribe(project => {

            this.editProjectForm.patchValue({
               notes: project.notes,
               projectName: project.name,
               externalId: project.externalId,
               programId: project.program.id
            })

            this.rowVersion = project.rowVersion
         })

   }

   onSubmit() {

      this.updateProjectGQL.mutate({
         data: {
            programId: this.editProjectForm.value["programId"],
            name: this.editProjectForm.value['projectName'],
            notes: this.editProjectForm.value['notes'],
            externalId: this.editProjectForm.value['externalId'],
            rowVersion: this.rowVersion,
            id: this.projectId
         }
      }, {}).subscribe(({ data }) =>
         this.router.navigate(['projects', data.updateProject.id]))
   }

   cancel() {
      return this.router.navigate(['projects', this.projectId])
   }

   ngOnDestroy(): void {
      this.programsSubscription$.unsubscribe()
      this.projectSubscription$.unsubscribe()
   }
}
