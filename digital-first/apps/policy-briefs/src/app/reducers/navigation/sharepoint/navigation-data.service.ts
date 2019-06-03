import { Injectable } from '@angular/core'
import { Observable, of, forkJoin } from 'rxjs'
import { SharepointJsomService } from '@df/sharepoint'

import { concatMap, map } from 'rxjs/operators'
import { sortBy } from '../../../utils'
import { NavigationDataService } from '../navigation-data.service';

const NAVIGATION_LIST_NAME = 'Navigation'

export const mapNavigation = (item): any =>
  ({
    id: `${item.ID}`,
    title: item.Title,
    sortOrder: item.SortOrder,
  })

export const mapNavigations = (items): any[] => (items || []).map(mapNavigation)

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
          Title: item.title,
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

  getNavigations = (
    parent
  ): Observable<{
    data: any
    loading: boolean
  }> =>
    forkJoin([
      this.sharepoint.getItems({
        listName: NAVIGATION_LIST_NAME
      })
    ]).pipe(
      map(([spNavigations]) => [...mapNavigations(spNavigations)]),
      map(result => (result || []).sort(sortBy('sortOrder'))),
      concatMap(result =>
        of({
          data: result,
          loading: false
        })
      )
    )

  constructor(private sharepoint: SharepointJsomService) {}
}
