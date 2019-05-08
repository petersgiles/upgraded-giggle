import {Action} from '@ngrx/store'
import { NavigationExtras } from '@angular/router'
import { OperatorFunction } from 'rxjs'
import { filter } from 'rxjs/operators'

export const GO = '[Router] Go'
export const BACK = '[Router] Back'
export const FORWARD = '[Router] Forward'
export const CHANGE = '[Router] Route Change'

export class Go implements Action {
  readonly type = GO

  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {
  }
}

export class Back implements Action {
  readonly type = BACK
}

export class Forward implements Action {
  readonly type = FORWARD
}

export type Actions = Go | Back | Forward

export class RouteChange implements Action {
  readonly type = CHANGE
  constructor(public payload: { params: any, path: string }) {}
}

export function ofRoute(route: string | string[]): OperatorFunction<Action, Action> {
  return filter((action: Action) => {
      const isRouteAction = action.type === CHANGE;
      if (isRouteAction) {
          const routeAction = action as RouteChange;
          const routePath = routeAction.payload.path;
          if (Array.isArray(route)) {
              return route.includes(routePath);
          } else {
              return routePath === route;
          }
      }
      return isRouteAction;
  });
}
