import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { formConstants } from '../../../form-constants'
import { CreateRoleGQL } from '../../../generated/graphql'

@Component({
  selector: 'digital-first-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private createRoleGql: CreateRoleGQL,
    private router: Router
  ) {}

  addRoleForm = this.formBuilder.group({
    roleTitle: [
      null,
      [
        Validators.required,
        Validators.pattern(formConstants.emptyStringPattern),
        Validators.maxLength(formConstants.nameMaxLength)
      ]
    ],

    createAgency: false,
    createProgram: false,
    createProject: false,
    createReport: false,
    createStatistic: false,
    deleteAgency: false,
    deleteProgram: false,
    deleteProject: false,
    deleteReport: false,
    deleteStatistic: false,
    adminLogin: false,
    allAgencyModifier: false,
    manageApiKeys: false,
    manageGroups: false,
    manageAccessControls: false,
    updateElectorateAdvice: false,

    description: ['']
  })

  ngOnInit() {}

  onSubmit() {
    this.createRoleGql
      .mutate(
        {
          data: {
            title: this.addRoleForm.value['roleTitle'],
            description: this.addRoleForm.value['description'],
            createAgency: this.addRoleForm.value['createAgency'],
            createProgram: this.addRoleForm.value['createProgram'],
            createProject: this.addRoleForm.value['createProject'],
            createReport: this.addRoleForm.value['createReport'],
            createStatistic: this.addRoleForm.value['createStatistic'],
            deleteAgency: this.addRoleForm.value['deleteAgency'],
            deleteProgram: this.addRoleForm.value['deleteProgram'],
            deleteProject: this.addRoleForm.value['deleteProject'],
            deleteReport: this.addRoleForm.value['deleteReport'],
            deleteStatistic: this.addRoleForm.value['deleteStatistic'],
            adminLogin: this.addRoleForm.value['adminLogin'],
            allAgencyModifier: this.addRoleForm.value['allAgencyModifier'],
            manageApiKeys: this.addRoleForm.value['manageApiKeys'],
            manageGroups: this.addRoleForm.value['manageGroups'],
            manageAccessControls: this.addRoleForm.value[
              'manageAccessControls'
            ],
            updateElectorateAdvice: this.addRoleForm.value[
              'updateElectorateAdvice'
            ]
          }
        },
        {}
      )
      .subscribe(({ data }) =>
        this.router.navigate(['roles', data.createRole.id])
      )
  }

  cancel() {
    return this.router.navigate(['roles'])
  }
}
