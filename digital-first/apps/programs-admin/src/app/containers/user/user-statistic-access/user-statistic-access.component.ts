import { Component, Input, OnInit } from '@angular/core'
import { Maybe, User } from '../../../generated/graphql'
import { DataTableConfig } from '@digital-first/df-datatable'

@Component({
  selector: 'digital-first-user-statistic-access',
  templateUrl: './user-statistic-access.component.html',
  styleUrls: ['./user-statistic-access.component.scss']
})
export class UserStatisticAccessComponent implements OnInit {
  statisticAccessRows: Maybe<Maybe<User.StatisticAccess>[]>

  statisticAccessConfig: DataTableConfig = {
    title: 'Users',

    headings: [
      { caption: 'Statistic name' },
      { caption: 'Group Name' },
      { caption: 'Rights' }
    ],
    rows: [{ id: '', cells: [] }]
  }

  @Input() artifactId: string

  @Input()
  set tableData(val) {
    this.statisticAccessRows = val.map(i => ({
      id: `${i.entityId}-${i.groupId}`,
      cells: [
        { value: i.name },
        { value: i.groupName },
        { value: i.accessRights }
      ]
    }))
  }

  constructor() {}

  ngOnInit() {}
}
