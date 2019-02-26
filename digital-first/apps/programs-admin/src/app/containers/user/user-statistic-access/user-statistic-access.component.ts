import { Component, Input, OnInit } from '@angular/core'
import { Maybe, User } from '../../../generated/graphql'
import { formConstants } from '../../../form-constants'

@Component({
  selector: 'digital-first-user-statistic-access',
  templateUrl: './user-statistic-access.component.html',
  styleUrls: ['./user-statistic-access.component.scss']
})
export class UserStatisticAccessComponent implements OnInit {
  columns = [
    { prop: 'name', name: 'Statistic Name' },
    { prop: 'groupName', name: 'Group Name' },
    { prop: 'hasAccessToParent', name: 'Has Access to Parent' },
    { prop: 'parentName', name: 'Parent Name' }
  ]

  @Input()
  statisticAccessRows: Maybe<Maybe<User.StatisticAccess>[]>
  defaultPageLength: number = formConstants.defaultPageLength

  constructor() {}

  ngOnInit() {}
}
