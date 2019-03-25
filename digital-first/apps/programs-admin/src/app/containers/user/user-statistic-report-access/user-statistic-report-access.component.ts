import { Component, Input, OnInit } from '@angular/core'
import { formConstants } from '../../../form-constants'
import { UserQuery } from '../../../generated/graphql'

@Component({
  selector: 'digital-first-user-statistic-report-access',
  templateUrl: './user-statistic-report-access.component.html',
  styleUrls: ['./user-statistic-report-access.component.scss']
})
export class UserStatisticReportAccessComponent implements OnInit {
  @Input()
  statisticReportAccessRows: UserQuery['user']['statisticReportAccess']

  columns = [
    { prop: 'name', name: 'Statistic Report Name' },
    { prop: 'parentName', name: 'Parent Name' },
    { prop: 'groupName', name: 'Group Name' },
    { prop: 'hasAccessToParent', name: 'Has Access to Parent' },
    { prop: 'rights ', name: 'Rights' }
  ]

  defaultPageLength: number = formConstants.defaultPageLength

  constructor() {}

  ngOnInit() {}
}
