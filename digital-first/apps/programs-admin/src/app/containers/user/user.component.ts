import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {User, UserGQL} from '../../generated/graphql'
import {map} from 'rxjs/operators'
import {Subscription} from 'rxjs'

@Component({
  selector: 'digital-first-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  private userId: string
  private userSubscription$: Subscription
  private user: User.Users

  constructor(private route: ActivatedRoute,
              private userGQL: UserGQL) {
  }

  ngOnInit() {

    this.userId = this.route.snapshot.paramMap.get('id')

    this.userSubscription$ = this.userGQL
      .watch({userId: this.userId}, {fetchPolicy: 'network-only'})
      .valueChanges.pipe(map(value => value.data.users[0]))
      .subscribe(user => {
        this.user = user
      })
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe()
  }
}
