import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { DiscussionDataService } from '../discussion-data.service'
import { comments } from '../../../../../../../devdata/data'
import { DiscussionMapperService } from '../../../services/mappers/discussion-mapper.service';
import { DiscussionType } from '../../../models';
import { max } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DiscussionDataLocalService implements DiscussionDataService {

  fakeDiscussionBackend: Subject<any[]> = new Subject()
  fakeDiscussionBackendSubscription$: Subscription
  discussionItems: BehaviorSubject<any> = new BehaviorSubject(null)
  discussions: any[]
  
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
    var maxId =
      Math.max.apply(
        Math,
        comments.map(function(o) {
          return o.Id
        })
      )

    var nextId = maxId + 1

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
    return of({ brief: payload.brief, loading: false })
  }
  
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
  removeDiscussion(item: any): Observable<any> {
    let foundBriefs = comments.filter(({Brief}) => Brief.Id === item.brief)

    let foundComment = foundBriefs.filter(comment => comment.Id.toString() === item.id)
    let index = comments.findIndex(x => x === foundComment[0])
    comments.splice(index,1)
   
    this.fakeDiscussionBackend.next(comments)
    return of({ briefId: item.brief, loading: false })
  }

  public getDiscussions(item: {
    id: string
    channel: DiscussionType
  }): Observable<{
    data: any
    loading: boolean
  }> {

   
   const discussions = this.getDiscussions_(item.channel, item.id)
    //const discussions = comments.filter(p => {
    //  return p.Channel === item.channel && `${p.Brief.Id}` === `${item.id}`
   // })

    return of({
      data: this.discussionMapperService.mapMany(discussions),
      loading: false
    })
  }

  private getDiscussions_(channel, id): any[]{

    this.discussions = []
    this.discussionItems.subscribe(res => {
      res.data.forEach(comment => {
        if(comment.Channel === channel  && `${comment.Brief.Id}` === `${id}`){
          this.discussions.push(comment)
        }
      })
    })
    return this.discussions
  }

  constructor(private discussionMapperService: DiscussionMapperService) {
    this.fakeDiscussionBackendSubscription$ = this.fakeDiscussionBackend.subscribe(next =>
      this.discussionItems.next({
        data: next,
        loading: false
      })
    )

    this.fakeDiscussionBackend.next(comments)
  }
}
