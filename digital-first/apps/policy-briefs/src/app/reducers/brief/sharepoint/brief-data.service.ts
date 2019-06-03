import { Injectable } from '@angular/core'
import { Observable, of, forkJoin } from 'rxjs'
import { SharepointJsomService } from '@df/sharepoint'
import { BriefDataService } from '../brief-data.service'
import { concatMap, map } from 'rxjs/operators'
import { sortBy } from '../../../utils'

const BRIEF_ITEM_LIST_NAME = 'Brief'

export const mapBrief = (item): any =>
  ({
    id: `${item.ID}`,
    title: item.Title,
    sortOrder: item.SortOrder,
  })

export const mapBriefs = (items): any[] => (items || []).map(mapBrief)

@Injectable({
  providedIn: 'root'
})
export class BriefDataSharepointService implements BriefDataService {
  addBrief = (item: any): Observable<any> =>
    this.sharepoint
      .storeItem({
        listName: BRIEF_ITEM_LIST_NAME,
        data: {}
      })
      .pipe(concatMap(_ => of({})))

  updateBrief = (item: any): Observable<any> =>
    this.sharepoint
      .storeItem({
        listName: BRIEF_ITEM_LIST_NAME,
        data: {
          Title: item.title,
        },
        id: item.id
      })
      .pipe(concatMap(_ => of({})))

  removeBrief = (item: { id: string }): Observable<any> =>
    this.sharepoint
      .removeItem({
        listName: BRIEF_ITEM_LIST_NAME,
        id: item.id
      })
      .pipe(concatMap(_ => of({})))

  getBriefs = (
    parent
  ): Observable<{
    data: any
    loading: boolean
  }> =>
    forkJoin([
      this.sharepoint.getItems({
        listName: BRIEF_ITEM_LIST_NAME
      })
    ]).pipe(
      map(([spBriefs]) => [...mapBriefs(spBriefs)]),
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
