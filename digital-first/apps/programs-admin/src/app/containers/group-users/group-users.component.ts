import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MdcDialog} from '@angular-mdc/web'
import {ActivatedRoute, Router} from '@angular/router'
import {DataTableConfig} from '@digital-first/df-components'

@Component({
  selector: 'digital-first-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.scss']
})
export class GroupUsersComponent implements OnInit {

  userTableConfig: DataTableConfig = {
    title: 'Users',
    hasDeleteItemButton: true,
    headings: [
      {caption: 'Email address'},
      {caption: 'Last login'}
    ],
    rows: [{id: '', cells: []}]
  }

  userTableRows: null

  @Input() artifactId: string
  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter()
  @Output() onAddItemClicked: EventEmitter<any> = new EventEmitter()
  @Output() onCellClicked: EventEmitter<any> = new EventEmitter()
  expanded: true

  constructor(public dialog: MdcDialog,
              private route: ActivatedRoute,
              private router: Router) {
  }

  @Input()
  set tableData(val) {

    this.userTableRows = val.map(i => ({
      id: i.id,
      cells: [{value: i.emailAddress}, {value: i.lastLogin}]
    }))

  }

  handleChangeExpanded(b: boolean) {

  }

  handleAddClicked($event) {
    alert('TODO:  add user to group')
  }

  handleTableDeleteClicked($event: any) {
    alert('TODO: remove user from group')
  }

  ngOnInit(): void {
  }
}
