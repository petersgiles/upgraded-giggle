import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { formConstants } from '../../../form-constants'
import { map } from 'rxjs/operators'
import { RoleGQL, UpdateRoleGQL } from '../../../generated/graphql'
import { Subscription } from 'rxjs'

@Component({
  selector: 'digital-first-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit, OnDestroy {
  rowVersion: string
  roleId: string
  roleSubscription$: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private roleGql: RoleGQL,
    private updateRoleGql: UpdateRoleGQL,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  editRoleForm = this.formBuilder.group({
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

  ngOnInit() {
    this.roleId = this.route.snapshot.paramMap.get('id')

    this.roleSubscription$ = this.roleGql
      .fetch({ roleId: this.roleId }, { fetchPolicy: 'network-only' })
      .pipe(map(value => value.data.role))
      .subscribe(value => {
        this.rowVersion = value.rowVersion
        this.editRoleForm.patchValue({
          roleTitle: value.title,
          description: value.description,
          createAgency: value.createAgency,
          createProgram: value.createProgram,
          createProject: value.createProject,
          createReport: value.createReport,
          createStatistic: value.createStatistic,
          deleteAgency: value.deleteAgency,
          deleteProgram: value.deleteProgram,
          deleteProject: value.deleteProject,
          deleteReport: value.deleteReport,
          deleteStatistic: value.deleteStatistic,
          adminLogin: value.adminLogin,
          allAgencyModifier: value.allAgencyModifier,
          manageApiKeys: value.manageApiKeys,
          manageGroups: value.manageGroups,
          manageAccessControls: value.manageAccessControls,
          updateElectorateAdvice: value.updateElectorateAdvice
        })
      })
  }

  ngOnDestroy(): void {
    this.roleSubscription$.unsubscribe()
  }

  cancel() {
    return this.router.navigate(['roles', this.roleId])
  }

  onSubmit() {
    this.updateRoleGql
      .mutate(
        {
          data: {
            title: this.editRoleForm.value['roleTitle'],
            description: this.editRoleForm.value['description'],
            rowVersion: this.rowVersion,
            id: this.roleId,
            createAgency: this.editRoleForm.value['createAgency'],
            createProgram: this.editRoleForm.value['createProgram'],
            createProject: this.editRoleForm.value['createProject'],
            createReport: this.editRoleForm.value['createReport'],
            createStatistic: this.editRoleForm.value['createStatistic'],
            deleteAgency: this.editRoleForm.value['deleteAgency'],
            deleteProgram: this.editRoleForm.value['deleteProgram'],
            deleteProject: this.editRoleForm.value['deleteProject'],
            deleteReport: this.editRoleForm.value['deleteReport'],
            deleteStatistic: this.editRoleForm.value['deleteStatistic'],
            adminLogin: this.editRoleForm.value['adminLogin'],
            allAgencyModifier: this.editRoleForm.value['allAgencyModifier'],
            manageApiKeys: this.editRoleForm.value['manageApiKeys'],
            manageGroups: this.editRoleForm.value['manageGroups'],
            manageAccessControls: this.editRoleForm.value[
              'manageAccessControls'
            ],
            updateElectorateAdvice: this.editRoleForm.value[
              'updateElectorateAdvice'
            ]
          }
        },
        {}
      )
      .subscribe(({ data }) =>
        this.router.navigate(['roles', data.updateRole.id])
      )
  }
}
