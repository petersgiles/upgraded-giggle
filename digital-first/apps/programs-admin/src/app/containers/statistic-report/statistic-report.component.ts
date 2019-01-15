import {Component, OnDestroy, OnInit} from '@angular/core'
import {
  AccessRights,
  AllGroupsGQL, AllStatistics,
  AssignGroupToReportGQL, Program, StatisticReport,

  StatisticReportGQL
} from '../../generated/graphql'
import {Subscription} from 'rxjs'
import {ActivatedRoute} from '@angular/router'
import {MdcDialog} from '@angular-mdc/web'
import {map} from 'rxjs/operators'
import {DataTableConfig} from '@digital-first/df-components'
import StatisticReports = AllStatistics.StatisticReports
import Reports = Program.Reports

@Component({
  selector: 'digital-first-statistic-report',
  templateUrl: './statistic-report.component.html',
  styleUrls: ['./statistic-report.component.scss']
})
export class StatisticReportComponent implements OnInit, OnDestroy {

  report: StatisticReport.StatisticReports
  permissionTableData: any
  reportSubscription$: Subscription
  private reportId: string

  constructor(private route: ActivatedRoute,
              private reportGQL: StatisticReportGQL,
              private allGroupsGQL: AllGroupsGQL,
              public dialog: MdcDialog) {
  }

  ngOnInit() {
    this.reportId = this.route.snapshot.paramMap.get('id')

    this.reportSubscription$ = this.reportGQL.watch({reportId: this.reportId}, {fetchPolicy: 'network-only'})
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

  handleOpenAddGroupDialog($event: any) {
    alert('TODO')
  }

  handleGroupPermissionGroupClicked($event: any) {
    alert('TODO')
  }

  handleGroupPermissionChangeClicked($event: any) {
    alert('TODO')
  }

  handleGroupPermissionDeleteClicked($event: any) {
    alert('TODO')
  }

  private createStatisticPermissionGroupTableData(report: StatisticReport.StatisticReports): DataTableConfig {
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
              {value: AccessRights.Read, caption: 'Read'},
              {value: AccessRights.Write, caption: 'Read/Write'}
            ]
          }
        ]
      }
    })

    return {
      title: 'permissions',
      hasDeleteItemButton: true,
      headings: [{caption: 'Name'}, {caption: 'Permission'}],
      rows: rows
    }
  }
}
