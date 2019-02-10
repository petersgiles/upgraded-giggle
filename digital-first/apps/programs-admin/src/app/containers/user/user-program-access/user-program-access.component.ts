import { Component, Input, OnInit } from '@angular/core'
import { DataTableConfig } from '@digital-first/df-datatable'
import { Maybe, User } from '../../../generated/graphql'

@Component({
  selector: 'digital-first-user-program-access',
  templateUrl: './user-program-access.component.html',
  styleUrls: ['./user-program-access.component.scss']
})
export class UserProgramAccessComponent implements OnInit {
  programAccessRows: Maybe<Maybe<User.ProgramAccess>[]>

  programAccessConfig: DataTableConfig = {
    title: 'Users',

    headings: [
      { caption: 'Program name' },
      { caption: 'Group Name' },
      { caption: 'Rights' }
    ],
    rows: [{ id: '', cells: [] }]
  }

  @Input() artifactId: string

  @Input()
  set tableData(val) {
    this.programAccessRows = val.map(i => ({
      id: i.id,
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
