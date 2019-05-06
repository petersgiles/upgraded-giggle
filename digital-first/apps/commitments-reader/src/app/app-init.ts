import { SettingsService } from './services/settings.service'
import {
  StartAppInitialiser,
  FinishAppInitialiser
} from './reducers/app/app.actions'
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
           // tslint:disable-next-line: no-console
          tap(config =>  console.log(`🦄 Filter`, config)),
          filter(config => config !== null),
          first()
        )
        .subscribe(result => {
          // tslint:disable-next-line: no-console
          console.log(`🦄 App Initialised`, result)
          store.dispatch(new FinishAppInitialiser())
          resolve(true)
        })
    })
}
