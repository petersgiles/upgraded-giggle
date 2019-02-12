import { Component, Input, OnInit } from '@angular/core'
import { DataTableConfig } from '@digital-first/df-datatable'
import { Maybe, User } from '../../../generated/graphql'

@Component({
  selector: 'digital-first-user-report-access',
  templateUrl: './user-report-access.component.html',
  styleUrls: ['./user-report-access.component.scss']
})
export class UserReportAccessComponent implements OnInit {
  reportAccessConfig: DataTableConfig = {
    title: 'Users',

    headings: [
      { caption: 'Report Name' },
      { caption: 'Group Name' },
      { caption: 'Access to Parent' }
    ],
    rows: [{ id: '', cells: [] }]
  }

  reportAccessRows: Maybe<Maybe<User.ReportAccess>[]>

  @Input() artifactId: string

  @Input()
  set tableData(val) {
    this.reportAccessRows = val.map(i => ({
      id: `${i.entityId}-${i.groupId}`,
      cells: [
        { value: i.name },
        { value: i.groupName },
        { value: i.hasAccessToParent }
      ]
    }))
  }

  constructor() {}

  ngOnInit() {}
}
