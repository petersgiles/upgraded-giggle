import { Component, Input, OnInit } from '@angular/core'
import { formConstants } from '../../../form-constants'
import { UserQuery } from '../../../generated/graphql'

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
  statisticAccessRows: UserQuery['user']['statisticAccess']
  defaultPageLength: number = formConstants.defaultPageLength

  constructor() {}

  ngOnInit() {}
}
