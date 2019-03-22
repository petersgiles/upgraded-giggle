import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { formConstants } from '../../form-constants'
import {
  AllRolesGQL,
  CreateRoleAccessControlGroupGQL,
  GroupGQL,
  GroupQuery
} from '../../generated/graphql'
import { MdcDialog } from '@angular-mdc/web'
import { ActivatedRoute, Router } from '@angular/router'
import { ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent } from '@df/components'
import { first, map } from 'rxjs/operators'
import { DialogAssignRoleToGroupComponent } from '../../dialogs/dialog-assign-role-to-group.component'

type Roles = GroupQuery['group']['roles']
type Role = Roles[0]

@Component({
  selector: 'digital-first-group-roles',
  templateUrl: './group-roles.component.html',
  styleUrls: ['./group-roles.component.scss']
})
export class GroupRolesComponent implements OnInit {
  constructor(
    public dialog: MdcDialog,
    private route: ActivatedRoute,
    private router: Router,
    private rolesGql: AllRolesGQL,
    private groupGQL: GroupGQL,
    private createAccessControlGroupRoleGql: CreateRoleAccessControlGroupGQL
  ) {}

  emptyTableMessage: { emptyMessage: string; totalMessage: string }
  defaultPageLength: number = formConstants.defaultPageLength

  columns = [
    { prop: 'title', name: 'Title' },
    { prop: 'description', name: 'Description' }
  ]

  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter()
  @Output() onAddItemClicked: EventEmitter<any> = new EventEmitter()

  @Input()
  roles: Roles

  @Input()
  groupId: string

  ngOnInit() {
    this.emptyTableMessage = {
      emptyMessage: 'No roles have been assigned to this group',
      totalMessage: 'total'
    }
  }

  handleAddClicked($event) {
    {
      this.rolesGql
        .watch({}, { fetchPolicy: 'no-cache' })
        .valueChanges.pipe(
          map(value => value.data.roles),
          first()
        )
        .subscribe(roles => {
          const dialogRef = this.dialog.open(DialogAssignRoleToGroupComponent, {
            escapeToClose: true,
            clickOutsideToClose: true,
            data: {
              roles: roles.filter(
                value => !this.roles.map(role => role.id).includes(value.id)
              )
            }
          })

          dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result.id) {
              this.createAccessControlGroupRoleGql
                .mutate(
                  {
                    data: {
                      accessControlGroupId: this.groupId,
                      roleId: result.id
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

  handleTableDeleteClicked(role: Role) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && role.id) {
          this.onDeleteClicked.emit(role)
        }
      })
  }

  handleRoleNavigation($event: any) {
    return this.router.navigate(['roles/', $event.id])
  }
}
