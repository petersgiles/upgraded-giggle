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

export const mapNavigationNode = (item): any => {
  const policy = idFromLookup(item.Policy)
  const subpolicy = idFromLookup(item.SubPolicy)

  let nodeId = item.ID
  let parent = null

  if (policy) {
    nodeId = [policy, item.ID].filter(p => !!p).join('-')
    parent = `${policy}`
  }

  if (subpolicy) {
    nodeId = [policy, subpolicy, item.ID].filter(p => !!p).join('-')
    parent = [policy, subpolicy].filter(p => !!p).join('-')
  }

  return {
    id: nodeId,
    briefId: item.ID,
    caption: item.Title,
    parent: parent,
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
      }),
      this.sharepoint.getItems({
        listName: 'Brief'
      })
    ]).pipe(
      map(([spPolicy, spSubPolicy, spBrief]) => [
        ...mapNavigationNodes(spPolicy),
        ...mapNavigationNodes(spSubPolicy),
        ...mapNavigationNodes(spBrief)
      ]),
      map(nodes => {
        // this relies on the order of nodes i.e policy then subpolicy then brief
        const nodesHash = arrayToHash(nodes)

        const colourised = nodes.reduce((acc, item, index, array) => {
          if (!item.colour) {
            item.colour = nodesHash[item.parent].colour
          }

          acc.push(item)
          return acc
        }, [])

        return colourised
      }),
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
