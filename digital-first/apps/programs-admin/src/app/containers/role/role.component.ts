import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MdcDialog } from '@angular-mdc/web'
import { DeleteRoleGQL, Maybe, Role, RoleGQL } from '../../generated/graphql'
import { Subscription } from 'rxjs'
import { first, map } from 'rxjs/operators'
import { ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent } from '@df/components'

@Component({
  selector: 'digital-first-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  private roleId: string
  roleSubscription$: Subscription
  role: Maybe<Role.Role>
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleGql: RoleGQL,
    private deleteRoleGql: DeleteRoleGQL,
    public dialog: MdcDialog
  ) {}

  ngOnInit() {
    this.roleId = this.route.snapshot.paramMap.get('id')

    this.roleSubscription$ = this.roleGql
      .watch({ roleId: this.roleId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.role))
      .subscribe(role => {
        this.role = role
      })
  }

  handleEditRoles(role: Maybe<Role.Role>) {
    return this.router.navigate(['roles/edit', role.id], {
      skipLocationChange: true
    })
  }

  handleDeleteRole(role: Maybe<Role.Role>) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.role) {
          this.deleteRoleGql
            .mutate(
              {
                data: {
                  id: role.id
                }
              },
              {}
            )
            .subscribe(value => this.router.navigate(['roles']))
        }
      })
  }
}
