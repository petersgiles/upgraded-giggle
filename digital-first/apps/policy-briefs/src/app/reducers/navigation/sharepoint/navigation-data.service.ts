import { Injectable } from '@angular/core'
import { Observable, of, forkJoin } from 'rxjs'
import { SharepointJsomService, idFromLookup } from '@df/sharepoint'

import { concatMap, map } from 'rxjs/operators'
import { NavigationDataService } from '../navigation-data.service'
import { arrayToHash } from '@df/utils'

const NAVIGATION_LIST_NAME = 'Navigation'

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

@Injectable({
  providedIn: 'root'
})
export class NavigationDataSharepointService implements NavigationDataService {
  addNavigation = (item: any): Observable<any> =>
    this.sharepoint
      .storeItem({
        listName: NAVIGATION_LIST_NAME,
        data: {}
      })
      .pipe(concatMap(_ => of({})))

  updateNavigation = (item: any): Observable<any> =>
    this.sharepoint
      .storeItem({
        listName: NAVIGATION_LIST_NAME,
        data: {
          Title: item.title
        },
        id: item.id
      })
      .pipe(concatMap(_ => of({})))

  removeNavigation = (item: { id: string }): Observable<any> =>
    this.sharepoint
      .removeItem({
        listName: NAVIGATION_LIST_NAME,
        id: item.id
      })
      .pipe(concatMap(_ => of({})))

  getNavigations = (): Observable<{
    data: any
    loading: boolean
  }> =>
    forkJoin([
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

  constructor(private sharepoint: SharepointJsomService) {}
}
