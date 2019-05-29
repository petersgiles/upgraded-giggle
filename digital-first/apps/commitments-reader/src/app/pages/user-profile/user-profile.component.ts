import { Component, OnInit } from '@angular/core'
import { AppDataService } from '../../services/app-data/app-data.service'
import { Observable } from 'rxjs'
import { AppUserProfile } from '@digital-first/df-layouts'
import * as fromUser from '../../reducers/user/user.reducer'
import { Store, select } from '@ngrx/store'
import {
  UserState,
  getUserCurrentUser,
  getUserOperationMatrix
} from '@digital-first/df-app-core'
@Component({
  selector: 'digital-first-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profile$: Observable<AppUserProfile>
  userOperation$: Observable<any>
  permissions$: Observable<any>

  constructor(private store: Store<UserState>) {}

  ngOnInit() {
    this.profile$ = this.store.pipe(select(getUserCurrentUser))

    this.userOperation$ = this.store.pipe(select(getUserOperationMatrix))
  }
}
