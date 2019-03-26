import { Component, Input, OnInit } from '@angular/core'
import { UserQuery } from '../../../generated/graphql'
import { formConstants } from '../../../form-constants'

@Component({
  selector: 'digital-first-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss']
})
export class UserGroupsComponent implements OnInit {
  columns = [{ prop: 'title', name: 'Group Name' }]

  @Input()
  groupRows: UserQuery['user']['groups']
  defaultPageLength: number = formConstants.defaultPageLength

  constructor() {}

  ngOnInit() {}
}
