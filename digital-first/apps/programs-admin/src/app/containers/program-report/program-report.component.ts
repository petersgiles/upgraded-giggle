import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { first, map } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { DialogAssignGroupPermissionComponent } from '../../dialogs/dialog-assign-group-permission.component'
import { MdcDialog } from '@angular-mdc/web'
import {
  AccessRights,
  AllGroupsGQL,
  CreateReportAccessControlGQL,
  DeleteAccessControlGQL,
  ReportGQL,
  ReportQuery,
  UpdateAccessControlGQL
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
  report: ReportQuery['report']
  reportId: string
  programId: string
  reportSubscription$: Subscription
  latestVersion: ReportQuery['report']['latestVersion']
  permissionRows: PermissionRow[]
  noDataMessage =
    'This report inherits its permissions from the program. Adding groups here will break inheritance.'

  constructor(
    private reportGql: ReportGQL,
    private route: ActivatedRoute,
    private allGroupsGql: AllGroupsGQL,
    private createReportAccessControlGql: CreateReportAccessControlGQL,
    private deleteAccessControlGql: DeleteAccessControlGQL,
    private updateAccessControlGql: UpdateAccessControlGQL,
    private router: Router,
    public dialog: MdcDialog
  ) {}

  ngOnInit() {
    this.reportId = this.route.snapshot.paramMap.get('id')
    this.programId = this.route.snapshot.paramMap.get('programId')
    this.reportSubscription$ = this.reportGql
      .watch({ reportId: this.reportId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.report))
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
        this.latestVersion = report.latestVersion
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
    this.updateAccessControlGql
      .mutate(
        {
          data: {
            accessControlGroupId: permissionChanged.row.id,
            accessControlListId: permissionChanged.row.acl,
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
    this.deleteAccessControlGql
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

  handleEditReport(report: ReportQuery['report']) {
    return this.router.navigate(['../edit', report.id], {
      relativeTo: this.route
    })
  }
  handleEditReportVersion(reportVersionId: string) {
    return this.router.navigate([
      `report-version-edit/${this.programId}/${
        this.report.id
      }/${reportVersionId}`
    ])
  }
}
