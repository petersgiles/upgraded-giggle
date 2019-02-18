import { Component, Input, OnInit } from '@angular/core'
import { Maybe, User } from '../../../generated/graphql'
import { formConstants } from '../../../form-constants'

@Component({
  selector: 'digital-first-user-statistic-report-access',
  templateUrl: './user-statistic-report-access.component.html',
  styleUrls: ['./user-statistic-report-access.component.scss']
})
export class UserStatisticReportAccessComponent implements OnInit {
  @Input()
  statisticReportAccessRows: Maybe<Maybe<User.StatisticReportAccess>[]>

  columns = [
    { prop: 'name', name: 'Statistic Name' },
    { prop: 'parentName', name: 'Parent Name' },
    { prop: 'groupName', name: 'Group Name' },
    { prop: 'hasAccessToParent', name: 'Has Access to Parent' },
    { prop: 'rights ', name: 'Rights' }
  ]

  defaultPageLength: number = formConstants.defaultPageLength

  constructor() {}

  ngOnInit() {}
}
