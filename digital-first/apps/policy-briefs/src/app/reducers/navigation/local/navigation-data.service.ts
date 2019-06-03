import { Injectable } from '@angular/core'
import {
  Observable,
  of,
  BehaviorSubject,
  Subject,
  Subscription,
  forkJoin
} from 'rxjs'

import { navigation, briefs, policies, subpolicies } from './data'
import { NavigationDataService } from '../navigation-data.service'
import { map, concatMap } from 'rxjs/operators'

import { arrayToHash } from '@df/utils'

export const mapNavigationNode = (item): any => {
  // tslint:disable-next-line: no-console
  console.log(`mapNavigationNode`)
  const policy = item.Policy ? item.Policy.Id : null
  const subpolicy = item.SubPolicy ? item.SubPolicy.Id : null

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
export class NavigationDataLocalService implements NavigationDataService {
  fakeNavigationBackend: Subject<any[]> = new Subject()
  fakeNavigationBackendSubscription$: Subscription
  navigationItems: BehaviorSubject<any> = new BehaviorSubject(null)

  addNavigation(item: any): Observable<any> {
    throw new Error('Method not implemented.')
  }
  updateNavigation(item: any): Observable<any> {
    throw new Error('Method not implemented.')
  }
  removeNavigation(item: { id: string }): Observable<any> {
    throw new Error('Method not implemented.')
  }

  public getNavigations = (): Observable<{
    data: any
    loading: boolean
  }> => {
    // tslint:disable-next-line: no-console
    console.log(`getNavigations`)

    const nodes = [
      ...mapNavigationNodes(policies.d.results),
      ...mapNavigationNodes(subpolicies.d.results),
      ...mapNavigationNodes(briefs.d.results)
    ]

    // this relies on the order of nodes i.e policy then subpolicy then brief
    const nodesHash = arrayToHash(nodes)

    const colourised = nodes.reduce((acc, item, index, array) => {
      if (!item.colour) {
        item.colour = nodesHash[item.parent].colour
      }
      acc.push(item)
      return acc
    }, [])

    return of({
      data: { nodes: colourised },
      loading: false
    })
  }

  constructor() {
    this.fakeNavigationBackendSubscription$ = this.fakeNavigationBackend.subscribe(
      next =>
        this.navigationItems.next({
          data: next,
          loading: false
        })
    )

    this.fakeNavigationBackend.next(navigation)
  }
}
