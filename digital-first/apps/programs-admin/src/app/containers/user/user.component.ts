import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core'
import { formatDate } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import {
  UserGQL,
  DeleteUserGQL,
  CreateApiKeyGQL,
  UserQuery,
  DisableApiKeyGQL
} from '../../generated/graphql'
import { map, first } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router'

import { MdcDialog } from '@angular-mdc/web'
import { formConstants } from '../../form-constants'
import { ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent } from '@df/components'
import { DialogApiKeyComponent } from './dialog-apikey.component'

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

  apiKeysColumns = []

  @ViewChild('disableTemplate') disableTemplate: TemplateRef<any>

  constructor(
    private route: ActivatedRoute,
    private userGQL: UserGQL,
    private router: Router,
    public dialog: MdcDialog,
    private deleteUserGQL: DeleteUserGQL,
    private disableApiKeyGQL: DisableApiKeyGQL,
    private createApiKeyGQL: CreateApiKeyGQL
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')
    this.apiKeysColumns = [
      { prop: 'key', name: 'Hashed Key' },
      { prop: 'created', name: 'Created' },
      { prop: 'enabled', name: 'Enabled' },
      {
        name: '',
        cellTemplate: this.disableTemplate,
        prop: 'disable'
      }
    ]

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
            created: `${formatDate(value.created, 'medium', 'en-AU')}`,
            enabled: !value.disable
          })
        )
      })
  }

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

  handleDisableApiKey($event, row) {
    console.log($event)

    console.log(row)

    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.user) {
          this.disableApiKeyGQL
            .mutate(
              {
                data: {
                  id: row.id
                }
              },
              {}
            )
            .subscribe(() => this.loadUser())
        }
      })
  }

  handleAddApiKey() {
    const result = this.createApiKeyGQL
      .mutate(
        {
          data: {
            userId: this.userId
          }
        },
        {}
      )
      .subscribe(value => {
        const dialogRef = this.dialog.open(DialogApiKeyComponent, {
          escapeToClose: true,
          clickOutsideToClose: true,
          data: {
            apiKey: value.data.createApiKey
          }
        })

        dialogRef.afterClosed().subscribe(value1 => {
          this.loadUser()
        })
      })
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe()
  }
}
