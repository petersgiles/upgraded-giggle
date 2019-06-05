import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { SharepointJsomService, idFromLookup } from '@df/sharepoint'
import { concatMap, map, switchMap, tap, catchError } from 'rxjs/operators'
import { EMPTY, of, Observable, forkJoin } from 'rxjs'
import {
  NavigationActionTypes,
  NavigationActions,
  GetNavigations,
  LoadNavigations,
  GetNavigationsFailure
} from './navigation.actions'
import { NavigatorTreeNode } from '@df/components'
import { arrayToHash } from '@df/utils'
import { NavigationDataService } from './navigation-data.service';



@Injectable()
export class NavigationEffects {

  @Effect()
  getNavigations$ = this.actions$.pipe(
    ofType(NavigationActionTypes.GetNavigations),
    map((action: GetNavigations) => action),
    concatMap(_ => this.service.getNavigations()),
    switchMap(
      (result: { data: { nodes: NavigatorTreeNode[] }; loading: boolean }) => [
        new LoadNavigations({
          nodes: result.data.nodes,
          loading: result.loading
        })
      ]
    ),
    catchError(error => of(new GetNavigationsFailure(error)))
  )

  constructor(
    private actions$: Actions<NavigationActions>,
    private service: NavigationDataService
  ) {}
}
