import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AccessRights,
  AllGroupsGQL,
  CreateStatisticReportAccessControlGQL,
  DeleteStatisticReportAccessControlGQL,
  StatisticReport,
  StatisticReportGQL,
  UpdateStatisticReportAccessControlGQL
} from '../../generated/graphql'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { MdcDialog } from '@angular-mdc/web'
import { first, map } from 'rxjs/operators'
import { DataTableConfig } from '@digital-first/df-datatable'

import { DialogAssignGroupPermissionComponent } from '../../dialogs/dialog-assign-group-permission.component'

@Component({
  selector: 'digital-first-statistic-report',
  templateUrl: './statistic-report.component.html',
  styleUrls: ['./statistic-report.component.scss']
})
export class StatisticReportComponent implements OnInit, OnDestroy {
  report: StatisticReport.StatisticReports
  permissionTableData: any
  reportSubscription$: Subscription
  private statisticReportId: string

  constructor(
    private route: ActivatedRoute,
    private statisticReportGql: StatisticReportGQL,
    private allGroupsGql: AllGroupsGQL,
    private createStatisticReportAccessControlGql: CreateStatisticReportAccessControlGQL,
    private deleteStatisticReportAccessControlGql: DeleteStatisticReportAccessControlGQL,
    private updateStatisticReportAccessControlGql: UpdateStatisticReportAccessControlGQL,
    private router: Router,
    public dialog: MdcDialog
  ) {}

  ngOnInit() {
    this.statisticReportId = this.route.snapshot.paramMap.get('id')

    this.reportSubscription$ = this.statisticReportGql
      .watch(
        { reportId: this.statisticReportId },
        { fetchPolicy: 'network-only' }
      )
      .valueChanges.pipe(map(value => value.data.statisticReports[0]))
      .subscribe(report => {
        this.report = report
        this.permissionTableData = this.createStatisticPermissionGroupTableData(
          report
        )
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
              groups: groups
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

  handleGroupPermissionChangeClicked(row) {
    this.updateStatisticReportAccessControlGql
      .mutate(
        {
          data: {
            accessControlGroupId: row.id,
            statisticReportId: this.statisticReportId,
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

  private createStatisticPermissionGroupTableData(
    report: StatisticReport.StatisticReports
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
        'This report inherits its permissions from the statistic. Adding groups here will break inheritance.'
    }
  }
}
