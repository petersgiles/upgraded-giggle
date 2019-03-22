import { Component, Input, OnInit } from '@angular/core'
import { formConstants } from '../../../form-constants'
import {UserQuery} from '../../../generated/graphql'

@Component({
  selector: 'digital-first-user-report-access',
  templateUrl: './user-report-access.component.html',
  styleUrls: ['./user-report-access.component.scss']
})
export class UserReportAccessComponent implements OnInit {
  @Input()
  reportAccessRows:  UserQuery['user']['reportAccess']

  columns = [
    { prop: 'name', name: 'Report Name' },
    { prop: 'parentName', name: 'Parent Program' },
    { prop: 'groupName', name: 'Group Name' },
    { prop: 'hasAccessToParent', name: 'Access to Parent' }
  ]

  defaultPageLength: number = formConstants.defaultPageLength

  constructor() {}

  ngOnInit() {}
}
