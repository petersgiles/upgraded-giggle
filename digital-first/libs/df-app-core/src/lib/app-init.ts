
import {
  StartAppInitialiser,
  FinishAppInitialiser
} from './reducers/app/app.actions'
import {
  GetCurrentUser
} from './reducers/user/user.actions'

import { Store } from '@ngrx/store'
import * as fromApp from './reducers/app/app.reducer'
import { first, filter } from 'rxjs/operators'

export function initApplication(
  store: Store<fromApp.State>
): Function {
  return () =>
    new Promise(resolve => {
      store.dispatch(new StartAppInitialiser({ environment: null }))
      store
        .select((state: any) => state.app.config)
        .pipe(
          filter(config => config !== null),
          first()
        )
        .subscribe(_ => {
          store.dispatch(new FinishAppInitialiser())
          store.dispatch(new GetCurrentUser(null))
          resolve(true)
        })
    })
}
