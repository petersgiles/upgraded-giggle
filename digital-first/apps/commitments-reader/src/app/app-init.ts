import { SettingsService } from './services/settings.service'
import {
  StartAppInitialiser,
  FinishAppInitialiser
} from './reducers/app/app.actions'
import {
  GetCurrentUser
} from './reducers/user/user.actions'
import { environment } from '../environments/environment'
import { Store } from '@ngrx/store'
import * as fromRoot from './reducers'
import { first, filter, tap } from 'rxjs/operators'

export function initApplication(
  store: Store<fromRoot.State>,
  settings: SettingsService
): Function {
  return () =>
    new Promise(resolve => {
      store.dispatch(new StartAppInitialiser({ environment: environment }))
      store
        .select((state: any) => state.app.config)
        .pipe(
          filter(config => config !== null),
          first()
        )
        .subscribe(result => {
          // tslint:disable-next-line: no-console
          console.log(`🦄 App Initialised`, result)
          store.dispatch(new FinishAppInitialiser())
          store.dispatch(new GetCurrentUser('Get User'))
          resolve(true)
        })
    })
}
