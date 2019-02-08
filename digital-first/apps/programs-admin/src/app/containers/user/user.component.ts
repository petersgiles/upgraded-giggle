import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Maybe, User, UserGQL } from '../../generated/graphql'
import { map } from 'rxjs/operators'
import { Subscription } from 'rxjs'

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
  constructor(private route: ActivatedRoute, private userGQL: UserGQL) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')

    this.userSubscription$ = this.userGQL
      .watch({ userId: this.userId }, { fetchPolicy: 'network-only' })
      .valueChanges.pipe(map(value => value.data.user))
      .subscribe(user => {
        this.user = user
        this.programAccessRows = user.programAccess
        this.reportAccessRows = user.reportAccess
      })
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe()
  }
}
