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
import { pickColor } from '../../utils/colour'
import { byBriefIdQuery } from '../../services/sharepoint/caml';

export const mapComment = (item): any => {
  const brief = idFromLookup(item.Brief)
  const parent = idFromLookup(item.Parent)
  const user = fromUser(item.Author)
  const author = {
    ...user,
    color: pickColor(user.email)
  }

  return {
    id: item.ID,
    title: item.Title,
    created: item.Created,
    text: item.Comments,
    brief: brief,
    parent: parent,
    author: author
  }
}

export const mapComments = (items): any[] => (items || []).map(mapComment)

@Injectable()
export class DiscussionEffects {
  // 💬

  getDiscussionNodes(
    briefId: string
  ): Observable<{
    data: { nodes: any[] }
    loading: boolean
  }> {

    const briefIdViewXml = byBriefIdQuery({ id: briefId })

    return forkJoin([
      this.sharepoint.getItems({
        listName: 'Comment',
        viewXml: briefIdViewXml
      })
    ]).pipe(
      map(([spComments]) => [...mapComments(spComments)]),
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
    concatMap(action => this.getDiscussionNodes(action.payload.activeBriefId)),
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
