import { Component, Input, OnInit } from '@angular/core'
import { Maybe, User } from '../../../generated/graphql'
import { formConstants } from '../../../form-constants'

@Component({
  selector: 'digital-first-user-report-access',
  templateUrl: './user-report-access.component.html',
  styleUrls: ['./user-report-access.component.scss']
})
export class UserReportAccessComponent implements OnInit {
  @Input()
  reportAccessRows: Maybe<Maybe<User.ReportAccess>[]>

  columns = [
    { prop: 'name', name: 'Program Name' },
    { prop: 'groupName', name: 'Group Name' },
    { prop: 'parentName', name: 'Parent' },
    { prop: 'hasAccessToParent', name: 'Access to Parent' }
  ]

  defaultPageLength: number = formConstants.defaultPageLength

  constructor() {}

  ngOnInit() {}
}
