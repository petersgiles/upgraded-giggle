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

export const mapNavigationNode = (item): any => {
  const parent = idFromLookup(item.Policy)

  const id = parent ? `${parent}-${item.ID}` : `${item.ID}`
  return {
    id: id,
    caption: item.Title,
    parent: `${parent}`,
    colour: item.Colour,
    order: item.SortOrder,
    active: false,
    expanded: false
  }
}

export const mapNavigationNodes = (items): any[] => items.map(mapNavigationNode)

@Injectable()
export class NavigationEffects {
  getPackNavigationNodes(): Observable<{
    data: { nodes: NavigatorTreeNode[] }
    loading: boolean
  }> {
    return forkJoin([
      this.sharepoint.getItems({
        listName: 'Policy'
      }),
      this.sharepoint.getItems({
        listName: 'SubPolicy'
      })
    ]).pipe(
      map(([spPolicy, spSubPolicy]) => [
        ...mapNavigationNodes(spPolicy),
        ...mapNavigationNodes(spSubPolicy)
      ]),
      concatMap(result =>
        of({
          data: { nodes: result },
          loading: false
        })
      )
    )
  }

  @Effect()
  getNavigations$ = this.actions$.pipe(
    ofType(NavigationActionTypes.GetNavigations),
    map((action: GetNavigations) => action),
    concatMap(_ => this.getPackNavigationNodes()),
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
    private sharepoint: SharepointJsomService
  ) {}
}
