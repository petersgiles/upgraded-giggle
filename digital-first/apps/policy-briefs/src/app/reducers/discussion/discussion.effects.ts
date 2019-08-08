import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import {
  concatMap,
  map,
  catchError,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators'
import { of, Observable } from 'rxjs'
import {
  DiscussionActionTypes,
  DiscussionActions,
  GetDiscussion,
  LoadDiscussions,
  GetDiscussionFailure,
  AddComment,
  RemoveComment
} from './discussion.actions'
import { idFromLookup, fromUser, SharepointJsomService } from '@df/sharepoint'
import { pickColor } from '../../utils/colour'
import { DiscussionDataService } from './discussion-data.service'
import { Store } from '@ngrx/store'
import * as fromRoot from '../index'


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

  // addComment(comment: {
  //   text: string
  //   brief: string
  //   parent: string
  // }): Observable<any> {
  //   return this.service
  //     .addDiscussion({
  //       listName: 'Comment',
  //       data: {
  //         Comments: comment.text,
  //         Brief: comment.brief,
  //         Parent: comment.parent
  //       }
  //     })
  //     .pipe(concatMap(_ => of({ brief: comment.brief })))
  // }

  // removeComment(comment: { id: string; brief: string }): Observable<any> {
  //   return this.service
  //     .removeDiscussion({
  //       id: comment.id
  //     })
  //     .pipe(concatMap(_ => of({ brief: comment.brief })))
  // }

  @Effect()
  loadDiscussions$ = this.actions$.pipe(
    ofType(DiscussionActionTypes.GetDiscussion),
    map((action: GetDiscussion) => action),
    withLatestFrom(this.store$),
    concatMap(([action, store]) => {
      console.log('loadDiscussions$', action, (<any>store).discussion)
      return this.service.getDiscussions({ id: action.payload.activeBriefId, channel: (<any>store).discussion.activeChannel })
    }),
    // tslint:disable-next-line: no-console
    tap(result => console.log(`💬 `, result)),
    switchMap((result: { data: any[]; loading: boolean }) => [
      new LoadDiscussions({
        data: result.data,
        loading: result.loading
      })
    ]),
    catchError(error => of(new GetDiscussionFailure(error)))
  )

  @Effect()
  addComment$ = this.actions$.pipe(
    ofType(DiscussionActionTypes.AddComment),
    map((action: AddComment) => action),
    concatMap((action) => this.service.addComment(action.payload)),
    // tslint:disable-next-line: no-console
    tap(result => console.log(`💬 `, result)),
    switchMap((result: { brief: string }) => [
      new GetDiscussion({
        activeBriefId: result.brief
      })
    ]),
    catchError(error => of(new GetDiscussionFailure(error)))
  )

  @Effect()
  removeComment$ = this.actions$.pipe(
    ofType(DiscussionActionTypes.RemoveComment),
    map((action: RemoveComment) => action),
    withLatestFrom(this.store$),
    concatMap(([action, store]) => this.service.removeComment(action.payload)),
    // tslint:disable-next-line: no-console
    tap(result => console.log(`💬 `, result)),
    switchMap((result: { brief: string }) => [
      new GetDiscussion({
        activeBriefId: result.brief
      })
    ]),
    catchError(error => of(new GetDiscussionFailure(error)))
  )

  constructor(
    private actions$: Actions<DiscussionActions>,
    private service: DiscussionDataService,
    private store$: Store<fromRoot.State>
  ) {}
}
