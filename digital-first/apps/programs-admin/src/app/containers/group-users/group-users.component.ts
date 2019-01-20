import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {MdcDialog} from '@angular-mdc/web'
import {ActivatedRoute, Router} from '@angular/router'
import {DataTableConfig} from '@digital-first/df-components'
import {first, map} from 'rxjs/operators'
import {CreateAccessControlGroupUserGQL, GroupGQL, UsersGQL} from '../../generated/graphql'
import {DialogAssignUserToGroupComponent} from '../../dialogs/dialog-assign-user-to-group.component'
import {ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent} from '@digital-first/df-dialogs'

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
  groupId: string

  constructor(public dialog: MdcDialog,
              private route: ActivatedRoute,
              private router: Router,
              private usersGQL: UsersGQL,
              private groupGQL: GroupGQL,
              private createAccessControlGroupUserGql: CreateAccessControlGroupUserGQL) {
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
    {
      this.usersGQL
        .watch({}, {fetchPolicy: 'no-cache'})
        .valueChanges.pipe(
        map(value => value.data.users),
        first()
      )
        .subscribe(users => {
          const dialogRef = this.dialog.open(
            DialogAssignUserToGroupComponent,
            {
              escapeToClose: true,
              clickOutsideToClose: true,
              data: {
                users: users
              }
            }
          )

          dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result.id) {
              this.createAccessControlGroupUserGql
                .mutate(
                  {
                    data: {
                      accessControlGroupId: this.groupId,
                      userId: result.id
                    }
                  },
                  {
                    refetchQueries: [
                      {
                        query: this.groupGQL.document,
                        variables: {
                          groupId: this.groupId
                        }
                      }
                    ]
                  }
                )
                .pipe(first())
                .subscribe(value => {
                  console.log('adding ', result)
                })
            }
          })
        })
    }
  }

  handleTableDeleteClicked($event) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.artifactId) {
          this.onDeleteClicked.emit($event)
        }
      })
  }

  ngOnInit(): void {

    this.groupId = this.route.snapshot.paramMap.get('id')
  }
}
