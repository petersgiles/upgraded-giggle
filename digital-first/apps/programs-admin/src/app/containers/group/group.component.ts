import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  DeleteAccessControlGroupGQL,
  Group,
  GroupGQL,
  DeleteAccessControlGroupUserGQL,
  Maybe,
  DeleteRoleAccessControlGroupGQL
} from '../../generated/graphql'
import { first, map } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { MdcDialog } from '@angular-mdc/web'
import Members = Group.Members
import { ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent } from '@df/components'

@Component({
  selector: 'digital-first-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  private groupId: string
  private groupSubscription$: Subscription
  group: Group.Group
  members: Maybe<Maybe<Group.Members>[]>
  roles: Maybe<Maybe<Group.Roles>[]>

  constructor(
    private route: ActivatedRoute,
    private groupGQL: GroupGQL,
    private deleteAccessControlGroupGql: DeleteAccessControlGroupGQL,
    private deleteAccessControlGroupUserGql: DeleteAccessControlGroupUserGQL,
    private deleteRoleAccessControlGroupGql: DeleteRoleAccessControlGroupGQL,
    private router: Router,
    public dialog: MdcDialog
  ) {}

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id')

    this.groupSubscription$ = this.groupGQL
      .watch({ groupId: this.groupId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.group))
      .subscribe(group => {
        this.group = group
        this.members = this.group.members
        this.roles = this.group.roles
      })
  }

  handleEditGroup(group: Group.Group) {
    return this.router.navigate(['groups/edit', group.id], {
      skipLocationChange: true
    })
  }

  handleDeleteGroup(group: Group.Group) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.group) {
          this.deleteAccessControlGroupGql
            .mutate(
              {
                data: {
                  id: group.id
                }
              },
              {}
            )
            .subscribe(value => this.router.navigate(['groups']))
        }
      })
  }

  handleUserDeleteItemClicked(member: Members) {
    this.deleteAccessControlGroupUserGql
      .mutate(
        {
          data: {
            userId: member.id,
            accessControlGroupId: this.groupId
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

  handleRoleDeleteItemClicked(role: Group.Roles) {
    this.deleteRoleAccessControlGroupGql
      .mutate(
        {
          data: {
            roleId: role.id,
            accessControlGroupId: this.groupId
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
}
