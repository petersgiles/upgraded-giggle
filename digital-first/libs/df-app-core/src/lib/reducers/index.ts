import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { RouterStateUrl } from './router-state-url'

import * as fromRouter from '@ngrx/router-store'

export { RouterStateUrl } from './router-state-url'

export { AppActionTypes } from '../reducers/app/app.actions'

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState
    const { queryParams } = routerState.root

    let state: ActivatedRouteSnapshot = routerState.root
    while (state.firstChild) {
      state = state.firstChild
    }
    const { params } = state

    return { url, queryParams, params }
  }
}
