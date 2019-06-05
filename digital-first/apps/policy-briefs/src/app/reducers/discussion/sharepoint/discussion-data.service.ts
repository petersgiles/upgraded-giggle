import { Injectable } from '@angular/core'
import { Observable, of, forkJoin } from 'rxjs'
import { SharepointJsomService } from '@df/sharepoint'
import { DiscussionDataService } from '../discussion-data.service'
import { concatMap, map } from 'rxjs/operators'
import { sortBy } from '../../../utils'

const DISCUSSION_ITEM_LIST_NAME = 'Discussion'

export const mapDiscussion = (item): any =>
  ({
    id: `${item.ID}`,
    title: item.Title,
    sortOrder: item.SortOrder,
  })

export const mapDiscussions = (items): any[] => (items || []).map(mapDiscussion)

@Injectable({
  providedIn: 'root'
})
export class DiscussionDataSharepointService implements DiscussionDataService {
  addDiscussion = (item: any): Observable<any> =>
    this.sharepoint
      .storeItem({
        listName: DISCUSSION_ITEM_LIST_NAME,
        data: {}
      })
      .pipe(concatMap(_ => of({})))

  updateDiscussion = (item: any): Observable<any> =>
    this.sharepoint
      .storeItem({
        listName: DISCUSSION_ITEM_LIST_NAME,
        data: {
          Title: item.title,
        },
        id: item.id
      })
      .pipe(concatMap(_ => of({})))

  removeDiscussion = (item: { id: string }): Observable<any> =>
    this.sharepoint
      .removeItem({
        listName: DISCUSSION_ITEM_LIST_NAME,
        id: item.id
      })
      .pipe(concatMap(_ => of({})))

  getDiscussions = (
    parent
  ): Observable<{
    data: any
    loading: boolean
  }> =>
    forkJoin([
      this.sharepoint.getItems({
        listName: DISCUSSION_ITEM_LIST_NAME
      })
    ]).pipe(
      map(([spDiscussions]) => [...mapDiscussions(spDiscussions)]),
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
