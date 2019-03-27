import { Component, Input, OnInit } from '@angular/core'
import { UserQuery } from '../../../generated/graphql'
import { formConstants } from '../../../form-constants'

@Component({
  selector: 'digital-first-user-program-access',
  templateUrl: './user-program-access.component.html',
  styleUrls: ['./user-program-access.component.scss']
})
export class UserProgramAccessComponent implements OnInit {
  defaultPageLength: number = formConstants.defaultPageLength

  @Input()
  programAccessRows: UserQuery['user']['programAccess']

  columns = [
    { prop: 'name', name: 'Program Name' },
    { prop: 'groupName', name: 'Group Name' },
    { prop: 'accessRights', name: 'Rights' }
  ]

  constructor() {}

  ngOnInit() {}
}
