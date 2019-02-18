import { Component, OnDestroy, OnInit } from '@angular/core'
import { formatDate } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import {
  Maybe,
  User,
  UserGQL,
  DeleteUserGQL,
  DeleteApiKeyGQL,
  CreateApiKeyGQL
} from '../../generated/graphql'
import { map, first } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router'
import {
  ARE_YOU_SURE_ACCEPT,
  DialogAreYouSureComponent
} from '@digital-first/df-dialogs'
import { MdcDialog } from '@angular-mdc/web'

@Component({
  selector: 'digital-first-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  userId: string
  userSubscription$: Subscription
  user: User.User
  programAccessRows: Maybe<Maybe<User.ProgramAccess[]>>
  reportAccessRows: Maybe<Maybe<User.ReportAccess>[]>
  statisticReportAccessRows: Maybe<Maybe<User.StatisticReportAccess>[]>
  statisticAccessRows: Maybe<Maybe<User.StatisticAccess>[]>
  apiKeysTableData: any
  constructor(
    private route: ActivatedRoute,
    private userGQL: UserGQL,
    private router: Router,
    public dialog: MdcDialog,
    private deleteUserGQL: DeleteUserGQL,
    private deleteApiKeyGQL: DeleteApiKeyGQL,
    private createApiKeyGQL: CreateApiKeyGQL
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
        this.apiKeysTableData = this.createApiKeyTableData(user)
      })
  }

  private createApiKeyTableData(user: User.User) {
    const apiKeys = user.apiKeys.map(data => ({
      id: data.id,
      key: data.key,
      created: data.created,
      disable: data.disable
    }))
    const rows = (apiKeys || []).map(d => ({
      id: d.id,
      data: d,
      cells: [
        {
          value: `${d.key}`
        },
        {
          value: `${formatDate(d.created, 'medium', 'en-AU')}`
        },
        {
          value: `${d.disable}`
        }
      ]
    }))

    return {
      title: 'Api Key',
      headings: [
        { caption: 'Key' },
        { caption: 'Created' },
        { caption: 'Disabled' }
      ],
      rows: rows,
      noDataMessage: 'This user has no API keys assigned.'
    }
  }
  handleEditUser(user: User.User) {
    return this.router.navigate(['users/edit', user.id])
  }

  handleDeleteUser(user: User.User) {
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
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && this.user) {
          this.deleteApiKeyGQL
            .mutate(
              {
                data: {
                  id: $event.id
                }
              },
              {}
            )
            .subscribe(() => this.loadUser())
        }
      })
  }

  handleAddApiKey() {
    this.createApiKeyGQL
      .mutate(
        {
          data: {
            userId: this.userId
          }
        },
        {}
      )
      .subscribe(() => this.loadUser())
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe()
  }
}
