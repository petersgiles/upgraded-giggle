import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { first, map } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { DataTableConfig } from '@digital-first/df-datatable'
import { DialogAssignGroupPermissionComponent } from '../../dialogs/dialog-assign-group-permission.component'
import { MdcDialog } from '@angular-mdc/web'
import {
  AccessRights,
  AllGroupsGQL,
  CreateReportAccessControlGQL,
  DeleteReportAccessControlGQL,
  Report,
  ReportGQL,
  UpdateReportAccessControlGQL
} from '../../generated/graphql'
import {
  PermissionChangedEvent,
  PermissionRow
} from '../permission/permission.component'

@Component({
  selector: 'digital-first-program-report',
  templateUrl: './program-report.component.html',
  styleUrls: ['./program-report.component.scss']
})
export class ProgramReportComponent implements OnInit, OnDestroy {
  report: Report.Reports

  reportId: string
  reportSubscription$: Subscription
  permissionRows: PermissionRow[]
  noDataMessage =
    'This report inherits its permissions from the program. Adding groups here will break inheritance.'

  constructor(
    private reportGql: ReportGQL,
    private route: ActivatedRoute,
    private allGroupsGql: AllGroupsGQL,
    private createReportAccessControlGql: CreateReportAccessControlGQL,
    private deleteReportAccessControlGql: DeleteReportAccessControlGQL,
    private updateReportAccessControlGql: UpdateReportAccessControlGQL,
    private router: Router,
    public dialog: MdcDialog
  ) {}

  ngOnInit() {
    this.reportId = this.route.snapshot.paramMap.get('id')

    this.reportSubscription$ = this.reportGql
      .watch({ reportId: this.reportId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.reports[0]))
      .subscribe(report => {
        this.report = report

        if (this.report.accessControlList.length === 1) {
          this.permissionRows = this.report.accessControlList[0].accessControlEntries.map(
            value => ({
              id: value.accessControlGroup.id,
              acl: this.report.accessControlList[0].id,
              title: value.accessControlGroup.title,
              rights: value.rights,
              rowVersion: value.rowVersion
            })
          )
        } else {
          this.permissionRows = []
        }
      })
  }

  ngOnDestroy(): void {
    this.reportSubscription$.unsubscribe()
  }

  handleOpenAddGroupDialog() {
    this.allGroupsGql
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
              groups: groups.filter(group => {
                if (
                  this.report.accessControlList &&
                  this.report.accessControlList[0]
                ) {
                  return !this.report.accessControlList[0].accessControlEntries
                    .map(value => value.accessControlGroup.id)
                    .includes(group.id)
                } else {
                  return group
                }
              })
            }
          }
        )

        dialogRef.afterClosed().subscribe((result: any) => {
          if (result && result.id) {
            this.createReportAccessControlGql
              .mutate(
                {
                  data: {
                    accessControlGroupId: result.id,
                    reportId: this.reportId,
                    accessRights: AccessRights.Read
                  }
                },
                {
                  refetchQueries: [
                    {
                      query: this.reportGql.document,
                      variables: {
                        reportId: this.reportId
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

  handleGroupPermissionGroupClicked($event: any) {
    return this.router.navigate(['groups/', $event.id])
  }

  handleGroupPermissionChangeClicked(
    permissionChanged: PermissionChangedEvent
  ) {
    this.updateReportAccessControlGql
      .mutate(
        {
          data: {
            accessControlGroupId: permissionChanged.row.id,
            reportId: this.reportId,
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
    this.deleteReportAccessControlGql
      .mutate(
        {
          data: {
            accessControlGroupId: $event.id,
            reportId: this.reportId
          }
        },
        {
          refetchQueries: [
            {
              query: this.reportGql.document,
              variables: {
                reportId: this.reportId
              }
            }
          ]
        }
      )
      .pipe(first())
      .subscribe(value => {})
  }

  handleEditReport(report: Report.Reports) {
    return this.router.navigate(['../edit', report.id], {
      relativeTo: this.route
    })
  }

  private createProgramPermissionGroupTableData(
    report: Report.Reports
  ): DataTableConfig {
    const groups = {}
    report.accessControlList.forEach(acl => {
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
        'This report inherits its permissions from the program. Adding groups here will break inheritance.'
    }
  }
}
