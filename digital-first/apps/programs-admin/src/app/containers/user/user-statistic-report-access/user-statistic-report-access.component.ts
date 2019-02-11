import { Component, Input, OnInit } from '@angular/core'
import { Maybe, User } from '../../../generated/graphql'
import { DataTableConfig } from '@digital-first/df-datatable'

@Component({
  selector: 'digital-first-user-statistic-report-access',
  templateUrl: './user-statistic-report-access.component.html',
  styleUrls: ['./user-statistic-report-access.component.scss']
})
export class UserStatisticReportAccessComponent implements OnInit {
  statisticReportAccessRows: Maybe<Maybe<User.StatisticReportAccess>[]>

  statisticReportAccessConfig: DataTableConfig = {
    title: 'Users',

    headings: [
      { caption: 'Statistic name' },
      { caption: 'Group Name' },
      { caption: 'Parent Name' },
      { caption: 'Has Access to Parent' },
      { caption: 'Rights' }
    ],
    rows: [{ id: '', cells: [] }]
  }

  @Input() artifactId: string

  @Input()
  set tableData(val) {
    this.statisticReportAccessRows = val.map(i => ({
      id: `${i.entityId}-${i.groupId}`,
      cells: [
        { value: i.name },
        { value: i.groupName },
        { value: i.parentName },
        { value: i.hasAccessToParent },
        { value: i.accessRights }
      ]
    }))
  }

  constructor() {}

  ngOnInit() {}
}
