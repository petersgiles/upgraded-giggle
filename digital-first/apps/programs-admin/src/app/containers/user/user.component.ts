import { Component, OnDestroy, OnInit } from '@angular/core'
import { formatDate } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import {
  UserGQL,
  DeleteUserGQL,
  // DeleteApiKeyGQL,
  // CreateApiKeyGQL,
  UserQuery
} from '../../generated/graphql'
import { map, first } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router'

import { MdcDialog } from '@angular-mdc/web'
import { formConstants } from '../../form-constants'
import { ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent } from '@df/components'

type User = UserQuery['user']

@Component({
  selector: 'digital-first-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  userId: string
  userSubscription$: Subscription
  user: User
  programAccessRows: User['programAccess']
  reportAccessRows: User['reportAccess']
  statisticReportAccessRows: User['statisticReportAccess']
  statisticAccessRows: User['statisticAccess']
  apiKeysRows: User['apiKeys']
  constructor(
    private route: ActivatedRoute,
    private userGQL: UserGQL,
    private router: Router,
    public dialog: MdcDialog,
    private deleteUserGQL: DeleteUserGQL,
    // private deleteApiKeyGQL: DeleteApiKeyGQL,
    // private createApiKeyGQL: CreateApiKeyGQL
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')
    this.loadUser()
  }

  private loadUser(): void {
    this.userSubscription$ = this.userGQL
      .watch({ userId: this.userId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.user))
      .subscribe(user => {
        this.user = user
        this.programAccessRows = user.programAccess
        this.reportAccessRows = user.reportAccess
        this.statisticReportAccessRows = user.statisticReportAccess
        this.statisticAccessRows = user.statisticAccess
        this.apiKeysRows = user.apiKeys.map(value =>
          Object.assign({}, value, {
            created: `${formatDate(value.created, 'medium', 'en-AU')}`
          })
        )
      })
  }

  apiKeysColumns = [
    { prop: 'key', name: 'Key' },
    { prop: 'created', name: 'Created' },
    { prop: 'disable', name: 'Disabled' }
  ]
  defaultPageLength: number = formConstants.defaultPageLength

  handleEditUser(user: User) {
    return this.router.navigate(['users/edit', user.id])
  }

  handleDeleteUser(user: User) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.user) {
          this.deleteUserGQL
            .mutate(
              {
                data: {
                  id: user.id
                }
              },
              {}
            )
            .subscribe(value => this.router.navigate(['users']))
        }
      })
  }

  handleDeleteApiKey($event) {

    //TODO: this will need to disable the key not actually deleted it.
    alert('not yet implemented')
    // const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
    //   escapeToClose: true,
    //   clickOutsideToClose: true
    // })
    //
    // dialogRef
    //   .afterClosed()
    //   .pipe(first())
    //   .subscribe(result => {
    //     if (result === ARE_YOU_SURE_ACCEPT && this.user) {
    //       this.deleteApiKeyGQL
    //         .mutate(
    //           {
    //             data: {
    //               id: $event.id
    //             }
    //           },
    //           {}
    //         )
    //         .subscribe(() => this.loadUser())
    //     }
    //   })
  }

  handleAddApiKey() {

    //TODO:  hand the issuing of an api key
    //This has changed to now be one way hash and so will need to present
    //the user with a one of chance to record the api key  as it can't be retrieved
    //due to the hash

    alert('not yet implemented')
    // this.createApiKeyGQL
    //   .mutate(
    //     {
    //       data: {
    //         userId: this.userId
    //       }
    //     },
    //     {}
    //   )
    //   .subscribe(() => this.loadUser())
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe()
  }
}
