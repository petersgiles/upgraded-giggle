import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { concatMap, map, catchError, switchMap } from 'rxjs/operators'
import { EMPTY, of, forkJoin, Observable } from 'rxjs'
import {
  DiscussionActionTypes,
  DiscussionActions,
  GetDiscussion,
  LoadDiscussions,
  GetDiscussionFailure
} from './discussion.actions'
import { idFromLookup, fromUser, SharepointJsomService } from '@df/sharepoint'

export const mapDiscusssionNode = (item): any => {
  const parent = idFromLookup(item.Brief)
  const author = fromUser(item.Author)
  return {
    id: item.ID,
    text: item.Comments1,
    created: item.Created,
    parent: parent,
    author: author
  }
}

export const mapDiscusssionNodes = (items): any[] =>
  items.map(mapDiscusssionNode)

@Injectable()
export class DiscussionEffects {
  // 💬

  getDiscussionNodes(): Observable<{
    data: { nodes: any[] }
    loading: boolean
  }> {
    return forkJoin([
      this.sharepoint.getItems({
        listName: 'Comment'
      })
    ]).pipe(
      map(([spComments]) => [...mapDiscusssionNodes(spComments)]),
      concatMap(result =>
        of({
          data: { nodes: result },
          loading: false
        })
      )
    )
  }

  @Effect()
  loadDiscussions$ = this.actions$.pipe(
    ofType(DiscussionActionTypes.GetDiscussion),
    map((action: GetDiscussion) => action),
    concatMap(_ => this.getDiscussionNodes()),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    switchMap((result: { data: { nodes: any[] }; loading: boolean }) => [
      new LoadDiscussions({
        data: result.data.nodes,
        loading: result.loading
      })
    ]),
    catchError(error => of(new GetDiscussionFailure(error)))
  )

  constructor(
    private actions$: Actions<DiscussionActions>,
    private sharepoint: SharepointJsomService
  ) {}
}
