import { Injectable } from '@angular/core'
import { Observable, of, forkJoin } from 'rxjs'
import { SharepointJsomService, idFromLookup } from '@df/sharepoint'

import { concatMap, map } from 'rxjs/operators'
import { NavigationDataService } from '../navigation-data.service'
import { arrayToHash } from '@df/utils'
import { BriefNavigationMapperService } from '../../../services/mappers/brief-navigation-mapper.service';

const NAVIGATION_LIST_NAME = 'Navigation'

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
        ...this.briefNavigationMapperService.mapMany(spPolicy),
        ...this.briefNavigationMapperService.mapMany(spSubPolicy),
        ...this.briefNavigationMapperService.mapMany(spBrief)
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

  constructor(private sharepoint: SharepointJsomService, private briefNavigationMapperService: BriefNavigationMapperService) {}
}
