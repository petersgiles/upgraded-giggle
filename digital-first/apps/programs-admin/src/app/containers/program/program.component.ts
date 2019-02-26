import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { first, map } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { MdcDialog } from '@angular-mdc/web'
import { DialogAssignGroupPermissionComponent } from '../../dialogs/dialog-assign-group-permission.component'
import {
  AccessRights,
  AllGroupsGQL,
  CreateProgramAccessControlGQL,
  DeleteProgramAccessControlGQL,
  DeleteProgramGQL,
  DeleteReportGQL,
  Maybe,
  Program,
  ProgramGQL,
  Report,
  UpdateProgramAccessControlGQL
} from '../../generated/graphql'
import Reports = Report.Reports
import {
  PermissionChangedEvent,
  PermissionRow
} from '../permission/permission.component'
import { ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent } from '@df/components'

@Component({
  selector: 'digital-first-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit, OnDestroy, AfterViewInit {
  program: Program.Program
  programId: string
  programsSubscription$: Subscription
  reportsTableData: Maybe<Maybe<Program.Reports>[]>
  noDataMessage =
    'No groups will be able to view this program. Please assign at least one group.'
  permissionRows: PermissionRow[]

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
    public dialog: MdcDialog,
    private cd: ChangeDetectorRef
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

        this.permissionRows = this.program.accessControlList[0].accessControlEntries.map(
          value => ({
            id: value.accessControlGroup.id,
            acl: this.program.accessControlList[0].id,
            title: value.accessControlGroup.title,
            rights: value.rights,
            rowVersion: value.rowVersion
          })
        )

        this.reportsTableData = this.program.reports
      })
  }

  ngAfterViewInit() {
    this.cd.detectChanges()
  }

  ngOnDestroy(): void {
    this.programsSubscription$.unsubscribe()
  }

  handleGroupPermissionGroupClicked($event) {
    return this.router.navigate(['groups/', $event.id])
  }

  handleGroupPermissionChangeClicked(
    permissionChanged: PermissionChangedEvent
  ) {
    this.updateGroupPermissionsForProgramGQL
      .mutate(
        {
          data: {
            accessControlGroupId: permissionChanged.row.id,
            programId: this.programId,
            accessRights: permissionChanged.event.value.toUpperCase(),
            rowVersion: permissionChanged.row.rowVersion
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
            accessControlListId: $event.acl
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
}
