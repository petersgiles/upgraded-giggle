import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MdcDialog } from '@angular-mdc/web'
import { ActivatedRoute, Router } from '@angular/router'
import { first, map } from 'rxjs/operators'
import {
  CreateAccessControlGroupUserGQL,
  GroupGQL,
  GroupQuery,
  UserGraph,
  UsersGQL
} from '../../generated/graphql'
import { DialogAssignUserToGroupComponent } from '../../dialogs/dialog-assign-user-to-group.component'
import { formConstants } from '../../form-constants'
import { ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent } from '@df/components'

type Members = GroupQuery['group']['members']
type Member = Members[0]

@Component({
  selector: 'digital-first-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.scss']
})
export class GroupUsersComponent implements OnInit {
  defaultPageLength: number = formConstants.defaultPageLength

  columns = [
    { prop: 'emailAddress', name: 'Email address' },
    { prop: 'lastLogin', name: 'Last login' }
  ]

  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter()
  @Output() onAddItemClicked: EventEmitter<any> = new EventEmitter()

  expanded: true

  @Input()
  members: Members

  @Input()
  groupId: string

  emptyTableMessage: { emptyMessage: string; totalMessage: string }

  constructor(
    public dialog: MdcDialog,
    private route: ActivatedRoute,
    private router: Router,
    private usersGQL: UsersGQL,
    private groupGQL: GroupGQL,
    private createAccessControlGroupUserGql: CreateAccessControlGroupUserGQL
  ) {}

  handleAddClicked($event) {
    {
      this.usersGQL
        .watch({}, { fetchPolicy: 'no-cache' })
        .valueChanges.pipe(
          map(value => value.data.users),
          first()
        )
        .subscribe(users => {
          const dialogRef = this.dialog.open(DialogAssignUserToGroupComponent, {
            escapeToClose: true,
            clickOutsideToClose: true,
            data: {
              users: users.filter(
                user => !this.members.map(member => member.id).includes(user.id)
              )
            }
          })

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
                .subscribe(value => {})
            }
          })
        })
    }
  }

  handleTableDeleteClicked(member: Member) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && member.id) {
          this.onDeleteClicked.emit(member)
        }
      })
  }

  handleUserNavigation($event: any) {
    return this.router.navigate(['users/', $event.id])
  }

  ngOnInit(): void {
    this.emptyTableMessage = {
      emptyMessage: 'No users have been assigned to this group',
      totalMessage: 'total'
    }
  }
}
