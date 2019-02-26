import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { map, first } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { DataTableConfig } from '@digital-first/df-datatable'
import { MdcDialog } from '@angular-mdc/web'
import { DialogAssignGroupPermissionComponent } from '../../dialogs/dialog-assign-group-permission.component'
import {
  ARE_YOU_SURE_ACCEPT,
  DialogAreYouSureComponent
} from '@digital-first/df-dialogs'
import {
  AllGroupsGQL,
  DeleteProgramGQL,
  Program,
  ProgramGQL,
  DeleteProgramAccessControlGQL,
  CreateProgramAccessControlGQL,
  AccessRights,
  UpdateProgramAccessControlGQL,
  DeleteReportGQL,
  Maybe,
  Report
} from '../../generated/graphql'
import Reports = Report.Reports

@Component({
  selector: 'digital-first-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit, OnDestroy {
  program: Program.Program
  programId: string
  permissionTableData: any
  programsSubscription$: Subscription
  reportsTableData: Maybe<Maybe<Program.Reports>[]>

  constructor(
    private programGQL: ProgramGQL,
    private route: ActivatedRoute,
    private deleteProgramGQL: DeleteProgramGQL,
    private deleteReportGQL: DeleteReportGQL,
    private removeGroupFromProgramGQL: DeleteProgramAccessControlGQL,
    private assignGroupToProgramGQL: CreateProgramAccessControlGQL,
    private updateGroupPermissionsForProgramGQL: UpdateProgramAccessControlGQL,
    private allGroupsGQL: AllGroupsGQL,
    private router: Router,
    public dialog: MdcDialog
  ) {}

  handleEditProgram(program) {
    return this.router.navigate(['programs/edit', program.id])
  }

  handleDeleteProgram(program) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.program) {
          this.deleteProgramGQL
            .mutate(
              {
                data: {
                  id: program.id
                }
              },
              {}
            )
            .subscribe(value => this.router.navigate(['programs']))
        }
      })
  }

  ngOnInit() {
    this.programId = this.route.snapshot.paramMap.get('id')

    this.programsSubscription$ = this.programGQL
      .watch({ programId: this.programId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.program))
      .subscribe(program => {
        this.program = program

        this.permissionTableData = this.createProgramPermissionGroupTableData(
          program
        )

        this.reportsTableData = this.program.reports
      })
  }

  ngOnDestroy(): void {
    this.programsSubscription$.unsubscribe()
  }

  handleGroupPermissionGroupClicked($event) {
    return this.router.navigate(['groups/', $event.id])
  }

  handleGroupPermissionChangeClicked(row) {
    this.updateGroupPermissionsForProgramGQL
      .mutate(
        {
          data: {
            accessControlGroupId: row.id,
            programId: this.programId,
            accessRights: row.cell.value,
            rowVersion: row.row.data.rowVersion
          }
        },
        {}
      )
      .pipe(first())
      .subscribe(value => {})
  }

  handleGroupPermissionDeleteClicked($event) {
    this.removeGroupFromProgramGQL
      .mutate(
        {
          data: {
            accessControlGroupId: $event.id,
            accessControlListId: $event.data.acl
          }
        },
        {
          refetchQueries: [
            {
              query: this.programGQL.document,
              variables: {
                programId: this.programId
              }
            }
          ]
        }
      )
      .pipe(first())
      .subscribe(value => {})
  }

  handleOpenAddGroupDialog() {
    this.allGroupsGQL
      .watch({}, { fetchPolicy: 'no-cache' })
      .valueChanges.pipe(
        map(value => value.data.groups),
        first()
      )
      .subscribe(groups => {
        const dialogRef = this.dialog.open(
          DialogAssignGroupPermissionComponent,
          {
            escapeToClose: true,
            clickOutsideToClose: true,
            data: {
              groups: groups.filter(
                group =>
                  !this.program.accessControlList[0].accessControlEntries
                    .map(value => value.accessControlGroup.id)
                    .includes(group.id)
              )
            }
          }
        )

        dialogRef.afterClosed().subscribe((result: any) => {
          if (result && result.id) {
            this.assignGroupToProgramGQL
              .mutate(
                {
                  data: {
                    accessControlGroupId: result.id,
                    programId: this.programId,
                    accessRights: AccessRights.Read
                  }
                },
                {
                  refetchQueries: [
                    {
                      query: this.programGQL.document,
                      variables: {
                        programId: this.programId
                      }
                    }
                  ]
                }
              )
              .pipe(first())
              .subscribe(value => {})
          }
        })
      })
  }

  handleProgramReportDeleteItemClicked(report: Reports) {
    this.deleteReportGQL
      .mutate(
        {
          data: {
            id: report.id
          }
        },
        {
          refetchQueries: [
            {
              query: this.programGQL.document,
              variables: {
                programId: this.programId
              }
            }
          ]
        }
      )
      .pipe(first())
      .subscribe(value => {})
  }

  private createProgramPermissionGroupTableData(
    program: Program.Program
  ): DataTableConfig {
    const groups = {}
    program.accessControlList.forEach(acl => {
      acl.accessControlEntries.forEach(ace => {
        groups[ace.accessControlGroup.title] = {
          id: ace.accessControlGroup.id,
          acl: acl.id,
          title: ace.accessControlGroup.title,
          rights: ace.rights,
          rowVersion: ace.rowVersion
        }
      })
    })
    const rows = (Object.keys(groups) || []).map(g => {
      const group = groups[g]
      return {
        id: group.id,
        data: group,
        cells: [
          {
            value: `${group.title}`,
            id: 'GROUPCELL'
          },
          {
            value: group.rights.toUpperCase(),
            type: 'radio',
            id: 'PERMISSIONCELL',
            data: [
              { value: AccessRights.Read, caption: 'Read' },
              { value: AccessRights.Write, caption: 'Read/Write' }
            ]
          }
        ]
      }
    })

    return {
      title: 'permissions',
      headings: [{ caption: 'Name' }, { caption: 'Permission' }],
      rows: rows,
      noDataMessage:
        'No groups will be able to view this program. Please assign at least one group.'
    }
  }
}
