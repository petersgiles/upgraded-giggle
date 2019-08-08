import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { DiscussionDataService } from '../discussion-data.service'
import { comments } from '../../../../../../../devdata/data'
import { DiscussionMapperService } from '../../../services/mappers/discussion-mapper.service'
import { DiscussionType } from '../../../models'
import { getLocaleDateTimeFormat } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class DiscussionDataLocalService implements DiscussionDataService {
  removeComment(payload: { id: string; brief: string }): Observable<any> {
    var found = comments.find(p => `${p.Id}` == payload.id)
    if (found) {
      let index = comments.indexOf(found)
      comments.splice(index, 1)
    }

    this.fakeDiscussionBackend.next(comments)
    return of({ briefId: payload.brief, loading: false })
  }
  addComment(payload: {
    brief: any
    text: any
    channel: DiscussionType
    parent: any
  }): Observable<any> {
    var nextId =
      Math.max.apply(
        Math,
        comments.map(function(o) {
          return o.Id
        })
      ) + 1

    var comment = {
      Brief: {
        Id: payload.brief
      },
      Channel: payload.channel,
      Parent: payload.parent,
      Recommendation: null,
      Author: {
        Title: 'Random Dude'
      },
      Id: nextId,
      Title: `${payload.brief}-${payload.channel}-${payload.parent ||
        ''}-${nextId}`,
      Comments: payload.text,
      ID: nextId,
      Created: Date.now().toLocaleString()
    }

    comments.push(comment)

    this.fakeDiscussionBackend.next(comments)
    return of({ briefId: payload.brief, loading: false })
  }
  fakeDiscussionBackend: Subject<any[]> = new Subject()
  fakeDiscussionBackendSubscription$: Subscription
  discussionItems: BehaviorSubject<any> = new BehaviorSubject(null)

  addDiscussion(item: any): Observable<any> {
    throw new Error('Method not implemented.')
  }

  updateDiscussion(item: any): Observable<any> {
    var found = comments.find(p => `${p.Id}` == item.Id)
    if (found) {
      let index = comments.indexOf(found)
      comments[index] = {
        ...found
      }
    }

    this.fakeDiscussionBackend.next(comments)
    return of({ briefId: item.Id, loading: false })
  }
  removeDiscussion(item: { id: string }): Observable<any> {
    throw new Error('Method not implemented.')
  }

  public getDiscussions(item: {
    id: string
    channel: DiscussionType
  }): Observable<{
    data: any
    loading: boolean
  }> {
    const discussions = comments.filter(p => {
      return p.Channel === item.channel && `${p.Brief.Id}` === `${item.id}`
    })

    return of({
      data: this.discussionMapperService.mapMany(discussions),
      loading: false
    })
  }

  constructor(private discussionMapperService: DiscussionMapperService) {}
}
