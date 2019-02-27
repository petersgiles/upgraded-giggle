import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AccessRights,
  AllGroupsGQL,
  CreateStatisticReportAccessControlGQL,
  DeleteStatisticReportAccessControlGQL,
  StatisticReport,
  StatisticReportGQL,
  UpdateStatisticReportAccessControlGQL,
  GetLatestVersionGQL,
  GetLatestVersion
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

@Component({
  selector: 'digital-first-statistic-report',
  templateUrl: './statistic-report.component.html',
  styleUrls: ['./statistic-report.component.scss']
})
export class StatisticReportComponent implements OnInit, OnDestroy {
  report: StatisticReport.StatisticReports
  reportSubscription$: Subscription
  latestVersionSubscription$: Subscription
  latestVersion: GetLatestVersion.LatestVersion
  statisticId: string
  statisticReportId: string

  noDataMessage =
    'This report inherits its permissions from the statistic. Adding groups here will break inheritance.'
  permissionRows: PermissionRow[]

  constructor(
    private route: ActivatedRoute,
    private statisticReportGql: StatisticReportGQL,
    private allGroupsGql: AllGroupsGQL,
    private createStatisticReportAccessControlGql: CreateStatisticReportAccessControlGQL,
    private deleteStatisticReportAccessControlGql: DeleteStatisticReportAccessControlGQL,
    private updateStatisticReportAccessControlGql: UpdateStatisticReportAccessControlGQL,
    private getLatestVersionGQL: GetLatestVersionGQL,
    private router: Router,
    public dialog: MdcDialog
  ) {}

  ngOnInit() {
    this.statisticReportId = this.route.snapshot.paramMap.get('id')
    this.statisticId = this.route.snapshot.paramMap.get('statisticId')
    this.reportSubscription$ = this.statisticReportGql
      .watch(
        { reportId: this.statisticReportId },
        { fetchPolicy: 'network-only' }
      )
      .valueChanges.pipe(map(value => value.data.statisticReports[0]))
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

    this.latestVersionSubscription$ = this.getLatestVersionGQL
      .watch(
        { statisticReportId: this.statisticReportId },
        { fetchPolicy: 'network-only' }
      )
      .valueChanges.pipe(map(result => result.data.latestVersion))
      .subscribe(item => {
        this.latestVersion = item
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
    this.updateStatisticReportAccessControlGql
      .mutate(
        {
          data: {
            accessControlGroupId: permissionChanged.row.id,
            statisticReportId: this.statisticReportId,
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
    this.deleteStatisticReportAccessControlGql
      .mutate(
        {
          data: {
            accessControlGroupId: $event.id,
            statisticReportId: this.statisticReportId
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

  handleEditStatisticReport(report: StatisticReport.StatisticReports) {
    return this.router.navigate(['../edit', report.id], {
      relativeTo: this.route
    })
  }

  handleEditReportVersion(reportVersionId: string) {
    return this.router.navigate([
      `edit-statistic-report-version/${reportVersionId}/${this.report.id}/${
        this.statisticId
      }`
    ])
  }
}
