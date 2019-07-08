import { Injectable } from '@angular/core'
import {
  Observable,
  of,
  BehaviorSubject,
  Subject,
  Subscription
} from 'rxjs'

import { policies, subpolicies, briefs } from '../../../../../../../devdata/data'

import { NavigationDataService } from '../navigation-data.service'

import { arrayToHash } from '@df/utils'
import { BriefNavigationMapperService } from '../../../services/mappers/brief-navigation-mapper.service';

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
    const nodes = [
      ...this.briefNavigationMapperService.mapMany(policies),
      ...this.briefNavigationMapperService.mapMany(subpolicies),
      ...this.briefNavigationMapperService.mapMany(briefs)
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

  constructor(private briefNavigationMapperService: BriefNavigationMapperService) {
  }
}
