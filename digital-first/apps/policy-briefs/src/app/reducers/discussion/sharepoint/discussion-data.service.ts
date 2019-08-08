import { Injectable } from '@angular/core'
import { Observable, of, forkJoin } from 'rxjs'
import {
  SharepointJsomService,
  idFromLookup,
  fromUser,
  fromLookup
} from '@df/sharepoint'
import { DiscussionDataService } from '../discussion-data.service'
import { concatMap, map, tap } from 'rxjs/operators'
import { sortBy } from '../../../utils'
import { DiscussionMapperService } from '../../../services/mappers/discussion-mapper.service'
import { DiscussionType } from '../../../models'
import { byBriefIdQuery } from '../../../services/sharepoint/caml'

const DISCUSSION_ITEM_LIST_NAME = 'Comment'

@Injectable({
  providedIn: 'root'
})
export class DiscussionDataSharepointService implements DiscussionDataService {
  removeComment(payload: { id: string; brief: string; }): Observable<any> {
    throw new Error("Method not implemented.");
  }
  addComment(payload: { brief: any; text: any; channel: DiscussionType; parent: any; }): Observable<any> {
    throw new Error("Method not implemented.");
  }
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
          Title: item.title
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

  getDiscussions = (item: {
    id: string
    channel: DiscussionType
  }): Observable<{
    data: any
    loading: boolean
  }> => {
    const briefIdViewXml = byBriefIdQuery({ id: item.id })

    return forkJoin([
      this.sharepoint.getItems({
        listName: DISCUSSION_ITEM_LIST_NAME,
        viewXml: briefIdViewXml
      })
    ]).pipe(
      map(([spDiscussions]) => {
        const discussions = spDiscussions.map(p => {
          const brief = fromLookup(p.Brief)
          const author = fromUser(p.Author)
          const parent = fromLookup(p.Parent)

          return {
            ...p,
            Brief: {
              Id: brief.id,
              Title: brief.title
            },
            Author: {
              Title: author.title,
              Email: author.email,
              Phone: author.phone
            }
          }
        })

        return [...this.discussionMapperService.mapMany(discussions)]
      }),
      map(result => (result || []).sort(sortBy('sortOrder'))),
      tap(result => console.log(`getDiscussions`, result)),
      concatMap(result =>
        of({
          data: result,
          loading: false
        })
      )
    )
  }

  constructor(
    private sharepoint: SharepointJsomService,
    private discussionMapperService: DiscussionMapperService
  ) {}
}
