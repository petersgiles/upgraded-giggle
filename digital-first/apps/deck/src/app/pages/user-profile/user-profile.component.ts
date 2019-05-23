import { Component, OnInit } from '@angular/core'
import { AppDataService } from '../../services/app-data/app-data.service'
import { Observable } from 'rxjs'
import { AppUserProfile } from '@digital-first/df-layouts'
import * as fromUser from '../../reducers/user/user.reducer'
import { Store, select } from '@ngrx/store'
@Component({
  selector: 'digital-first-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profile$: Observable<AppUserProfile>
  userOperation$: Observable<any>
  permissions$: Observable<any>

  constructor(private store: Store<fromUser.State>) {}

  ngOnInit() {
    this.profile$ = this.store.pipe(select(fromUser.getUserCurrentUser))

    this.userOperation$ = this.store.pipe(
      select(fromUser.getUserOperationMatrix)
    )
  }
}
