import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import {
  AllProgramsGQL,
  CreateProjectGQL,
  AllPrograms
} from '../../../generated/graphql'
import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { formConstants } from '../../../form-constants'
import { trimStringOrReturnNull } from '../../../core/graphqlhelper'

@Component({
  selector: 'digital-first-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit, OnDestroy {
  programsSubscription$: Subscription
  programs: AllPrograms.Programs[]

  addProjectForm = this.formBuilder.group({
    programId: [undefined, Validators.required],
    projectName: [
      null,
      [Validators.required, Validators.maxLength(formConstants.nameMaxLength)]
    ],
    externalId: [null],
    notes: ['']
  })

  constructor(
    private formBuilder: FormBuilder,
    private allProgramsGQL: AllProgramsGQL,
    private router: Router,
    private createProjectGQL: CreateProjectGQL
  ) {}

  ngOnInit() {
    this.programsSubscription$ = this.allProgramsGQL
      .watch({}, { fetchPolicy: 'cache-first' })
      .valueChanges.pipe(map(result => result.data.programs))
      .subscribe(value => {
        this.programs = value
      })
  }

  onSubmit() {
    this.createProjectGQL
      .mutate(
        {
          data: {
            name: this.addProjectForm.value['projectName'],
            notes: trimStringOrReturnNull(this.addProjectForm.value['notes']),
            externalId: trimStringOrReturnNull(
              this.addProjectForm.value['externalId']
            ),
            programId: this.addProjectForm.value['programId']
          }
        },
        {}
      )
      .subscribe(({ data }) =>
        this.router.navigate(['projects', data.createProject.id])
      )
  }

  cancel() {
    return this.router.navigate(['projects'])
  }

  ngOnDestroy(): void {
    this.programsSubscription$.unsubscribe()
  }
}
