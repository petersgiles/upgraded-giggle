import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AccessRights,
  AllGroupsGQL,
  CreateStatisticReportAccessControlGQL,
  StatisticReportDetailGQL,
  DeleteAccessControlGQL,
  UpdateAccessControlGQL,
  StatisticReportDetailQuery
} from '../../generated/graphql'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { MdcDialog } from '@angular-mdc/web'
import { first, map } from 'rxjs/operators'

import { DialogAssignGroupPermissionComponent } from '../../dialogs/dialog-assign-group-permission.component'
import {
  PermissionChangedEvent,
  PermissionRow
} from '../permission/permission.component'
import { DateTimeFormat } from '../../date-time-format'
type StatisticReport = StatisticReportDetailQuery['statisticReport']

@Component({
  selector: 'digital-first-statistic-report',
  templateUrl: './statistic-report.component.html',
  styleUrls: ['./statistic-report.component.scss']
})
export class StatisticReportComponent implements OnInit, OnDestroy {
  report: StatisticReport
  reportSubscription$: Subscription
  statisticId: string
  statisticReportId: string
  latestVersion: StatisticReport['latestVersion']
  noDataMessage =
    'This report inherits its permissions from the statistic. Adding groups here will break inheritance.'
  permissionRows: PermissionRow[]

  constructor(
    private route: ActivatedRoute,
    private statisticReportGql: StatisticReportDetailGQL,
    private allGroupsGql: AllGroupsGQL,
    private createStatisticReportAccessControlGql: CreateStatisticReportAccessControlGQL,
    private deleteAccessControlGql: DeleteAccessControlGQL,
    private updateAccessControlGql: UpdateAccessControlGQL,
    private router: Router,
    public dialog: MdcDialog,
    private dateTimeFormat: DateTimeFormat
  ) {}

  ngOnInit() {
    this.statisticReportId = this.route.snapshot.paramMap.get('id')
    this.statisticId = this.route.snapshot.paramMap.get('statisticId')

    this.reportSubscription$ = this.statisticReportGql
      .watch(
        { reportId: this.statisticReportId },
        { fetchPolicy: 'network-only' }
      )
      .valueChanges.pipe(map(value => value.data.statisticReport))
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
        this.latestVersion = this.report.latestVersion
        if (this.latestVersion) {
          this.latestVersion.dataDate = this.dateTimeFormat.formatDate(
            this.latestVersion.dataDate
          )
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
            this.createStatisticReportAccessControlGql
              .mutate(
                {
                  data: {
                    accessControlGroupId: result.id,
                    statisticReportId: this.statisticReportId,
                    accessRights: AccessRights.Read
                  }
                },
                {
                  refetchQueries: [
                    {
                      query: this.statisticReportGql.document,
                      variables: {
                        reportId: this.statisticReportId
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
              query: this.statisticReportGql.document,
              variables: {
                reportId: this.statisticReportId
              }
            }
          ]
        }
      )
      .pipe(first())
      .subscribe(value => {})
  }

  handleEditStatisticReport(report: StatisticReport) {
    return this.router.navigate(['../edit', report.id], {
      relativeTo: this.route
    })
  }

  handleEditReportVersion(reportVersionId: string) {
    return this.router.navigate([
      `statistic-report-version-edit/${this.statisticId}/${
        this.report.id
      }/${reportVersionId}`
    ])
  }
}
